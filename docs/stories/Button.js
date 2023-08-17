import prettify from "html-prettify";
import "../../templates/ombre/components/Button/Button.sass";
import prettifyOptions from "./prettify_options.json";

export const OmbreButton = ({
  label,
  backgroundColor
}) => {

  const ombreButton = `
        <table role="presentation" border="0" cellspacing="0" cellpadding="8" height="60px">
        <tbody>
            <tr>
                <td>
                    <div style="display:table;background:none;border:none;">
                        <!-- Vector Markup
                            https://docs.microsoft.com/en-us/windows/win32/vml/msdn-online-vml-colors-attribute
                            https://docs.microsoft.com/en-us/windows/win32/vml/msdn-online-vml-arcsize-attribute
                            https://docs.microsoft.com/en-us/windows/win32/vml/angle-attribute--fill--vml
                            https://www.hteumeuleu.com/2021/fixing-gmail-dark-mode-css-blend-modes/
                        -->
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{button_link}}" style="v-text-anchor:middle;width:214;height:44;" stroke="f" arcsize="50%" fillcolor="#f89825">
                            ${!backgroundColor === 'linear-gradient(to right, #f89825 0%, #f26322 18%, #e5333b 47%, #c81d5e 87%, #a91e5e 97%)' ? '<v:fill color="#f89825" color2="#a91e5e" colors="18% #f26322, 48% #e5333b, 89% #c81d5e" type="gradient" angle="270" />”' : ""}
                            <w:anchorlock/>
                            <center style="text-decoration:none;">
                        <![endif]-->
                        <a href="{{button_link}}" class="Button" ${backgroundColor ? `style="background:${backgroundColor}"` : ""} onclick="return false">
                            <span class="gmail-blend-screen">
                                <span class="gmail-blend-difference">
                                    ${label}
                                </span>
                            </span>
                        </a>
                        <!--[if mso]>
                                </center>
                            </v:roundrect>
                        <![endif]-->
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  `;

  return prettify(ombreButton, prettifyOptions);
};
