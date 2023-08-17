import { Container } from "./Container";
import "./hanna_ombre.sass";
import prettifyOptions from "./prettify_options.json";
const prettify = require('html-prettify');

export const hannaOmbre = ({
    imageLink,
    imageAlt,
    signature,
    mode
}) => {
  return Container(prettify(`
    <tr>
        <td>
            <table role="presentation" border="0" cellspacing="16" cellpadding="0" class="hanna-ombre" height="85px">
                <tr>
                    <td>
                        <!--[if (gte mso 9)|(IE)]>
                            <v:oval style="width:56;height:56">
                                <v:fill src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${imageLink}" style="width:56;height:56" type="frame">
                                </v:fill>
                            </v:oval>
                        <![endif]-->
                        <!--[if !mso]><!-->
                            <img src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${imageLink}" alt="${imageAlt}" style="width:50px;"
                                class="Avatar">
                        <!-- Issue if not mso stripped 
                            https://stackoverflow.com/questions/5982364/is-there-a-html-conditional-statement-for-everything-not-outlook -->
                        <!--<![endif]-->
                    </td>
                    <td class="Avatar-description" style="color:${mode && mode === "Dark" ? "#fffcf2" : "#040303"}">
                        ${signature}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
  `, prettifyOptions), mode)
}
