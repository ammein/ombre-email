/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import prettify from "html-prettify";
import { Container } from "./Container";
import "./footer_download.sass";
import prettifyOptions from "./prettify_options.json";

export const Download = ({downloadText, googlePlay, googlePlayAlt, googlePlayLink, appStore, appStoreAlt, appStoreLink, mode}) => {

    return Container(prettify(`
        <tr>
            <td>
                <table role="presentation" border="0" cellpadding="0" cellspacing="20" width="100%" height="123px">
                    <tbody>
                        <tr>
                            <td>
                                <div class="Divider" style="${mode === "Dark" ? "background-color: #e8e8e8;" : ""}"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" height="66px">
                                    <tbody>
                                        <tr>
                                            <td class="Download-On" style="${mode === "Dark" ? "color:#fffcf2;" : "" }">${downloadText}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                            <a href="${googlePlayLink}">
                                                            <!--[if (gte mso 9)|(IE)]>
                                                                <v:roundrect style="width:95;height:28" arcsize="5%" stroke="false">
                                                                    <v:fill src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${googlePlay}" style="width:95;height:28" type="frame">
                                                                </v:fill>
                                                                </v:roundrect>
                                                            <![endif]-->
                                                            <!--[if !mso]><!-->
                                                            <img width="95" height="28" src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${googlePlay}" alt="${googlePlayAlt}" class="google-play" style="max-width:95px;">
                                                            <!-- Issue if not mso stripped 
                                                                https://stackoverflow.com/questions/5982364/is-there-a-html-conditional-statement-for-everything-not-outlook -->
                                                            <!--<![endif]-->
                                                            </a>
                                                            </td>
                                                            <td>
                                                                <a href="${appStoreLink}">
                                                                    <!--[if (gte mso 9)|(IE)]>
                                                                    <v:roundrect style="width:84;height:28" arcsize="5%" stroke="false">
                                                                        <v:fill src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${appStore}" style="width:95;height:28" type="frame">
                                                                    </v:fill>
                                                                    </v:roundrect>
                                                                    <![endif]-->
                                                                    <!--[if !mso]><!-->
                                                                    <img width="84" height="28" src="${process.env.STORYBOOK_PLAY === "DEV" ? "" : "/ombre-email"}${appStore}" alt="${appStoreAlt}" style="max-width:84px;">
                                                                    <!-- Issue if not mso stripped 
                                                                        https://stackoverflow.com/questions/5982364/is-there-a-html-conditional-statement-for-everything-not-outlook -->
                                                                    <!--<![endif]-->
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    `, prettifyOptions), mode);
}


