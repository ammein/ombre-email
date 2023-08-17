/* eslint-disable import/no-webpack-loader-syntax */
import GlobalSassRawCode from "!!raw-loader!../../templates/ombre/global.sass";
import DarkSassRawCode from "!!raw-loader!../../templates/ombre/dark.sass";
import MainSassRawCode from "!!raw-loader!../../templates/ombre/main.sass";
import { htmlConverterReact } from "html-converter-react";
import { Hi } from './Hi';
import HiDocs from './Hi.mdx';

const args = {
    title: "Content/Hi",
    id: "hi",
    argTypes: {
        greetings: {
            description: 'Use your own words to greet reader',
            control: 'text',
            table : {
                type: {
                    summary: "Use your own words to greet reader..."
                }
            }
        },
        mode : {
            table : {
                disable: true
            }
        }
    },
    parameters: {
        layout: 'centered',
        zeplinLink: [{
                name: "Dark Hi",
                link: "zpl://components?coids=626252294029eaac6ca7e0d2&pid=62582b42e21a4d8d83001321"
            },
            {
                name: "Light Hi",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=626252281fc84cad65233d4f"
            },
        ],
        // Code Display
        storybookCodePanel: {
            disabled: false,
            files: [{
                    fileName: 'global.sass',
                    code: GlobalSassRawCode
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

const Template = (args) => htmlConverterReact(Hi(args))

export const darkHi = Template.bind({});

darkHi.args = {
    greetings: "Hi ",
    mode: "Dark"
}

darkHi.parameters = {
    docs: {
        page: HiDocs,
        source: {
            code: Hi(darkHi.args)
        }
    }
}

export const lightHi = Template.bind({});

lightHi.args = {
    greetings: "Hi ",
    mode: "Light"
}

lightHi.parameters = {
    docs: {
        page: HiDocs,
        source: {
            code: Hi(lightHi.args)
        }
    }
}

export default args;