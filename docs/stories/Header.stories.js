/* eslint-disable import/no-webpack-loader-syntax */
import {
    Header
} from './Header';
import {
    htmlConverterReact
} from 'html-converter-react';
import globalSassRawCode from "!!raw-loader!../../templates/ombre/global.sass";
import DarkSassRawCode from "!!raw-loader!../../templates/ombre/dark.sass";
import MainSassRawCode from "!!raw-loader!../../templates/ombre/main.sass";
import HeaderDocs from "./Header.mdx";

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
    title: 'Header/Top Header',
    id: 'header',
    // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
    argTypes: {
        mode: {
            table: {
                disable: true
            }
        },
        mobile: {
            control: 'boolean',
            defaultValue: false
        }
    },
    parameters: {
        zeplinLink: [{
                name: "Dark Desktop",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=6262522757697dace7caf814"
            },
            {
                name: "Light Desktop",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=626252261f7e18abf1f0145d"
            },
        ],
        // Code Display
        storybookCodePanel: {
            disabled: false,
            files: [{
                    fileName: 'global.sass',
                    code: globalSassRawCode
                },
                {
                    fileName: 'dark.sass',
                    code: DarkSassRawCode
                },
                {
                    fileName: 'main.sass',
                    code: MainSassRawCode
                }
            ]
        }
    }
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (args) => htmlConverterReact(Header(args))

export const darkHeaderDesktop = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
darkHeaderDesktop.args = {
    mode: "Dark"
};

darkHeaderDesktop.parameters = {
    docs: {
        page: HeaderDocs,
        source: {
            code: Header(darkHeaderDesktop.args)
        }
    }
}

export const lightHeaderDesktop = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
lightHeaderDesktop.args = {
    mode: "Light"
};

lightHeaderDesktop.parameters = {
    docs: {
        page: HeaderDocs,
        source: {
            code: Header(lightHeaderDesktop.args)
        }
    }
}