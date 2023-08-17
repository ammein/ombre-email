/* eslint-disable camelcase */
/* eslint-disable import/no-webpack-loader-syntax */
import {
    hannaOmbre
} from './hanna_ombre';
import globalSassRawCode from "!!raw-loader!../../templates/ombre/global.sass";
import Hanna_OmbreSassRawCode from "!!raw-loader!./hanna_ombre.sass";
import DarkSassRawCode from "!!raw-loader!../../templates/ombre/dark.sass";
import HannaDocs from "./hanna_ombre.mdx";
import conf from "../../templates/ombre/conf.json";

const config = JSON.stringify(conf);

export default {
    title: "Content/Hanna Ombre",
    id: "hanna-ombre",
    argTypes: {
        imageLink: {
            name: "Author Image",
            description: "Author Image from Ombré",
            control: "file",
            accept: ".png"
        },
        signature: {
            name: "Signature text",
            description: "Signature text from the author",
            control: "text"
        },
        mode: {
            table: {
                disable: true
            }
        }
    },
    parameters: {
        layout: "centered",
        docs: {
            page: HannaDocs
        },
        zeplinLink: [{
                name: "Dark Hanna Ombré",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=626252294eae91aeb9e3eb6c"
            },
            {
                name: "Light Hanna Ombré",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=6262522839ab2ead16384e51"
            }
        ],
        storybookCodePanel: {
            disabled: false,
            files: [{
                    fileName: "hanna-ombre.sass",
                    code: Hanna_OmbreSassRawCode
                },
                {
                    fileName: "global.sass",
                    code: globalSassRawCode
                },
                {
                    fileName: "dark.sass",
                    code: DarkSassRawCode
                }
            ]
        }
    }
}

const Template = (args) => hannaOmbre(args)

export const darkHanna = Template.bind({})

darkHanna.args = {
    imageLink: "/Hanna.jpeg",
    imageAlt: JSON.parse(config)[0]["author-alt"],
    signature: JSON.parse(config)[0].signature,
    mode: "Dark"
};

darkHanna.parameters = {
    docs: {
        source: {
            code: hannaOmbre(darkHanna.args)
        }
    }
}

export const lightHanna = Template.bind({})

lightHanna.args = {
    imageLink: "/Hanna.jpeg",
    imageAlt: JSON.parse(config)[0]["author-alt"],
    signature: JSON.parse(config)[0].signature,
    mode: "Light"
};

lightHanna.parameters = {
    docs: {
        source: {
            code: hannaOmbre(lightHanna.args)
        }
    }
}