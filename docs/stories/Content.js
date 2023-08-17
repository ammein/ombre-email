import "../../templates/ombre/components/Title/Title.sass";
import "../../templates/ombre/components/Description/Description.sass";
import {Container} from "./Container"
import prettify from "html-prettify";
import prettifyOptions from "./prettify_options.json";

export const Content = ({
  title,
  description,
  mode
}) => {

  return Container(
    prettify(`
    <tr>
        <td class="main-title" style="${mode === "Dark" ? "color: #fffcf2;" : "color:#040303;"}">${title}</td>
    </tr>
    <tr>
        <td class="description" style="${mode === "Dark" ? "color: #fffcf2;" : "color:#040303;"}">${description}</td>
    </tr>
  `, prettifyOptions), mode);
};
