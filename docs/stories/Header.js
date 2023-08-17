import prettify from "html-prettify";
import "./Header.sass";
import prettifyOptions from "./prettify_options.json";

const logoUrl = {
    src : '/logo-alt-v-2-default@3x.png',
    alt: "Ombré Logo"
}

export const Header = ({
    mobile,
    mode
}) => {

  return prettify(`
    <table role="presentation" border="0" cellspacing="0" width="${mobile? "360px" : "100%"}" cellpadding="24" style="background:${mode === "Light" ? "#fffcf2":"#040303"};" class="Header">
    <tr>
            <td>
                <img width="151.8" height="48.2" src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${logoUrl.src}" alt="${logoUrl.alt}" style="max-width:151.8px;">
            </td>
            <td class="View-on-another-browser-email" style="color:${mode === "Dark" ? "#fffcf2":"#040303"};" align="right">
                <span>
                    If you cannot view this email,
                    <a href="{{Weblink}}" class="link" target="_blank">view in browser</span>
                </span>
            </td>
        </tr>
    </table>
  `, prettifyOptions);
};
