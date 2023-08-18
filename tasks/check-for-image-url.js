'use strict';
const https = require('https');
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const PluginError = require('plugin-error');
const through = require('through2');
const cheerio = require('cheerio');

const {
  log
} = require('./util/util');

const PLUGIN_NAME = 'gulp-inline-images';
const MIME_TYPE_REGEX = /.+\/([^\s]*)/;
const INLINE_ATTR = 'inline';
const NOT_INLINE_ATTR = `!${INLINE_ATTR}`;

function inlineImg(options = {}) {
  var selector = options.selector || 'img[src]';
  const attribute = options.attribute || 'src';
  const getHTTP = options.getHTTP || false;
  const base64 = !!options.base64;

  return through.obj(function (file, encoding, callback) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return callback();
    }

    if (file.isBuffer()) {
      const contents = file.contents.toString(encoding);
      // Load it into cheerio's virtual DOM for easy manipulation
      var $ = cheerio.load(contents);
      const inlineFlag = $(`img[${INLINE_ATTR}]`);
      const vFillSrcTag = contents.match(/<v:fill\s*.*>\s*.*<\/v:fill>/g);
      const allVTag = [];

      // Author - Amin
      // Get all v:fill that has src tag in it.
      if (vFillSrcTag && vFillSrcTag.length > 1) {
        vFillSrcTag.forEach(function (val, i, arr) {
          allVTag.push(vFillSrcTag[i]);
        })
        selector = $($(selector) + $(allVTag.join("")));
      } else if (vFillSrcTag.length === 1) {
        selector = $($(selector) + $(vFillSrcTag[0]));
      }
      // If images with an inline attr are found that is the selection we want
      const imgTags = inlineFlag.length ? inlineFlag : $(selector);
      let count = inlineFlag.length ? imgTags.length - 1: $(selector).length - 1;

      // Author - Amin
      // use this htmlOverride to solve v:fill issue not updating
      // eslint-disable-next-line no-unused-vars
      let htmlOverride = "";

      imgTags.each(function () {
        const $img = $(this);
        const src = $img.attr(attribute);

        // Author - Amin
        // https://www.litmus.com/blog/understanding-retina-images-in-html-email/
        // To fix retina images
        const retina = !!(decodeURIComponent($img.attr("src")).match(/@.x/g) && decodeURIComponent($img.attr("src")).match(/@.x/g).length === 1)

        // Save the file format from the extension
        const extFormat = path.extname(src).substr(1);

        // If inlineFlag tags were found we want to remove the inline tag
        if (inlineFlag.length) {
          $img.removeAttr(INLINE_ATTR);
        }

        // Find !inline attribute
        const notInlineFlag = $img.attr(NOT_INLINE_ATTR);

        if (typeof notInlineFlag !== typeof undefined && notInlineFlag !== false) {
          // Remove the tag and don't process this file
          return $img.removeAttr(NOT_INLINE_ATTR);
        }

        getSrcBase64(options.buildDir, options.basedir || file.base, getHTTP, base64, src, (err, result, resFormat, skipFormatting) => {
          var after$ = cheerio.load(htmlOverride);
          if (err) {
            log.warn(`Failed to load http image. Check the format of ${src}.`);
            log.error(err);
          } else {
            // Need a format in and a result for this to work
            if (!skipFormatting) {
              if (result && (extFormat || resFormat)) {
                htmlOverride = htmlOverride.length > 0 ? htmlOverride.replace(src, `data:image/${extFormat};base64,${result}`) : $.html().replace(src, `data:image/${extFormat};base64,${result}`);
                after$ = cheerio.load(htmlOverride);

                // Author - Amin
                // https://www.litmus.com/blog/understanding-retina-images-in-html-email/
                // Check if html contain retina images and give warning to user if they haven't set width & height for email compatible
                if (retina) {

                  checkRetina($img, src)

                  // Set style of width:100% for Outlook issue
                  after$("[src=\"data:image/" + extFormat + ";base64," + result + "\"]").css({
                    width: "100%"
                  })
                }
              } else {
                $img.attr('src', ``);
                $img.attr('alt', `Image not found, Please check Url`);
                log.warn(`Failed to read image. Check the format of ${src}.`);
              }
            } else if (skipFormatting && !base64) {
              htmlOverride = htmlOverride.length > 0 ? htmlOverride.replace(new RegExp(src, 'g'), result) : $.html().replace(new RegExp(src, 'g'), result);
              after$ = cheerio.load(htmlOverride);
              if (retina) {
                checkRetina($img, src)

                // Set style of width:100% for Outlook issue
                after$("[src=\"" + result + "\"]").css({
                  width: "100%"
                })
              }
            }

            if (!--count) {
              file.contents = Buffer.from(after$.html());
              callback(null, file);
              // Count async ops
              count--;
            }
          }
        });
      });

      // If no files are processing we don't need to wait as none were ever started
      if (!imgTags.length) {
        file.contents = Buffer.from($.html());
        callback(null, file);
      }
    }
  });
}

function checkRetina($img, src) {
  if (($img[0].name === "img" && (!$img.attr("width") || !$img.attr("height")))) log.warn("You haven't set width/height for your " + decodeURIComponent(src).match(/@.x/g) + " asset and your must put 'max-width' in your style directly:\n" + "<img src=\"" + src + "\">")

  else if ($img[0].name === "img" && (!$img.attr("style") || !$img.attr("style").match("max-width"))) log.warn("You haven't set 'max-width' in your directly for your " + decodeURIComponent(src).match(/@.x/g) + ":\n" + "<img src=\"" + src + "\"> style=\"max-width:<set-your-width-here>;\"")

  else if (($img[0].name === "v:fill" && $img.attr("style")) && (!$img.attr("style").match("width") || !$img.attr("style").match("height"))) log.warn("You haven't set style for width/height on your " + decodeURIComponent(src).match(/@.x/g) + " asset:\n" + "<v:fill src=\"" + src + "\">")
}

function getHTTPBase64(url, base64, callback) {
  // Get applicable library
  const lib = url.startsWith('https') ? https : http;
  // Initiate a git request to our URL
  const req = lib.get(url, res => {
    // Check for redirect
    if (res.statusCode >= 301 && res.statusCode < 400 && res.headers.location) {
      // Redirect
      return getHTTPBase64(res.headers.location, callback);
    }
    // Check for HTTP errors
    if (res.statusCode < 200 || res.statusCode >= 400) {
      return callback(new Error('Failed to load page, status code: ' + res.statusCode));
    }
    // Get file format
    let format;
    if (res.headers['content-type']) {
      const matches = res.headers['content-type'].match(MIME_TYPE_REGEX);
      if (matches) {
        format = matches[1];
      }
    }

    // Create an empty buffer to store the body in
    let body = Buffer.from([]);

    // Append each chunk to the body
    res.on('data', chunk => (body = Buffer.concat([body, chunk])));

    // Done callback
    if (base64) {
      res.on('end', () => callback(null, body.toString('base64'), format, false));
    } else {
      callback(null, url, format, true)
    }
  });

  // Listen for network errors
  req.on('error', err => callback(err));
}

function getSrcBase64(buildDir, base, getHTTP, base64, src, callback) {
  // TODO: @deprecated — since v11.0.0 url.parse should be replaced with url.URL() ctor
  try {
    if (!new url.URL(src).hostname) {
      // Get local file
      const filePath = path.join(base, src);
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'base64', callback);
      } else {
        callback(null);
      }
    } else {
      // Get remote file
      if (getHTTP) {
        return getHTTPBase64(src, base64, callback);
      } else {
        callback(null, src, null, true);
      }
    }
  } catch(e) {
    callback(null, path.relative(buildDir, path.resolve(base, src)), null, true);
  }
}

module.exports = {
  inlineImg,
  getHTTPBase64,
  getSrcBase64
};