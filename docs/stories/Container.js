import prettify from "html-prettify";
import prettifyOptions from "./prettify_options.json";

export const Container = (props, mode) => {

  return prettify(`
        <table role="presentation" border="0" width="648px" cellspacing="8" cellpadding="0" style="background:${mode === "Dark" ? "#181111" : "#e8e8e8"}">
            <tbody>
              ${props}
            </tbody>
        </table>
  `, prettifyOptions);
};
