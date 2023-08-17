/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import prettify from "html-prettify";
import { Container } from "./Container";
import "./Hi.sass";
import prettifyOptions from "./prettify_options.json";

export const Hi = ({greetings, mode}) => {

    return Container(prettify(`
        <table role="presentation" border="0" width="100%" cellspacing="24" cellpadding="0" height="75px" style="background:${mode ? mode === "Dark" ? "#181111" : "#e8e8e8" : ""};">
            <tbody>
                <tr>
                    <td class="Hi" style="color:${mode ? mode === "Dark" ? "#fffcf2" : "#040303" : ""};">${greetings}{{last_name}},</td>
                </tr>
            </tbody>
        </table>
    `, prettifyOptions), mode);
}


