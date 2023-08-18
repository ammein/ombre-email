const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');
const minifyHTML = require('gulp-htmlmin');
const minifyInline = require('gulp-minify-inline');
const preprocess = require('gulp-preprocess');
const rename = require('gulp-rename');
const path = require('path');
const del = require('del');
const { inlineImg } = require('./check-for-image-url');
const { getConfigsForDir, getFilePathsForDir, getCssLinkTagsFromFilelist } = require('./util/util');
var inlinesource = require('gulp-inline-source');

function buildTask(options) {
  // Requires: 'dupe', 'less', 'sass', 'postcss', 'lint'.
  gulp.task('build', function build(done) {
    /**
     * Makes templates for a given directory & its configurations.
     *
     * @function makeTemplates
     * @param {String} dir Directory to make templates from.
     * @param {Array} confItems A list of configurations objects (usually persons) to make templates from.
     */
    function makeTemplates(dir, confItems) {
      return confItems.map(async conf => {
        const cwd = `${options.workingDir}/${dir}`;

        /**
         * Find stylesheets relative to the CWD & generate <link> tags.
         * This way we can automagically inject them into <head>.
         */
        const files = await getFilePathsForDir(cwd);
        const context = Object.assign(conf, {
          stylesheets: getCssLinkTagsFromFilelist(files, cwd)
        });

        return options
          .src([cwd + '/**/*.html', '!' + cwd + '/**/*.inc.html'])
          .pipe(preprocess({ context }))
          .pipe(inlineImg({ getHTTP: confItems[0].inlineRemoteUrl, base64: confItems[0].base64, basedir: confItems[0].basedir || path.resolve(options.sourceDir, dir), buildDir: path.resolve(options.distDir, dir) }))
          .pipe(inlinesource({
            ignore: ['css2']
          }))
          .pipe(
            inlineCss({
              applyTableAttributes: true,
              applyWidthAttributes: true,
              preserveMediaQueries: true,
              removeStyleTags: false,
              applyStyleTags: true
            })
          )
          .pipe(minifyHTML(
            {
              removeAttributeQuotes: true, 
              removeComments: true,
              // Source: https://github.com/kangax/html-minifier/issues/838
              ignoreCustomComments: [ /\[if.*|\[endif/, /\[if.*<!--\s-->|<!--\s<!\[endif.*-->/ ],
              collapseWhitespace: false
            }
            ))
          .pipe(minifyInline())
          .pipe(
            rename(function rename(path) {
              path.dirname = dir;
              path.basename += '-' + conf.id;
              return path;
            })
          )
          .pipe(gulp.dest(options.distDir));
      });
    }

    /*
     * Clean up & then read from workingDir to generate templates.
     * For each found config, a template group will be generated through `makeTemplates`.
     */
    return del(options.distDir)
      .then(() => {
        /**
         * Loop through dirs and load their conf files.
         * Promisify all 'makeTemplate' calls and when resolved, let gulp know we're done.
         */
        const configs = getConfigsForDir(options.workingDir, options.configurationFile);
        return Promise.all(configs.map(({ dir, confItems }) => makeTemplates(dir, confItems)));
      })
      .then(() => done())
      .catch(err => console.log(err));
  });
}

module.exports = buildTask;
