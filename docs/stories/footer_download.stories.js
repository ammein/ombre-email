/* eslint-disable camelcase */
/* eslint-disable import/no-webpack-loader-syntax */
import {
    Download
} from './footer_download';
import globalSassRawCode from "!!raw-loader!../../templates/ombre/global.sass";
import FooterDownloadSassCode from "!!raw-loader!./footer_download.sass";
import DarkSassRawCode from "!!raw-loader!../../templates/ombre/dark.sass";
import FooterDownloadDocs from "./footer_download.mdx";
import conf from "../../templates/ombre/conf.json";

const config = JSON.stringify(conf);

export default {
    title: "Footer/Download",
    id: "download",
    argTypes: {
        downloadText: {
            name: "Download Text",
            control: "text"
        },
        googlePlay: {
            table: {
                disable: true
            }
        },
        appStore: {
            table: {
                disable:true
            }
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
            page: FooterDownloadDocs
        },
        zeplinLink: [{
                name: "Dark Footer Download",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=6262522716a4cc1153499aae"
            },
            {
                name: "Light Footer Download",
                link: "zpl://components?coids=62625229f351e7acac12da76&pid=62582b42e21a4d8d83001321"
            }
        ],
        storybookCodePanel: {
            disabled: false,
            files: [{
                    fileName: "footer_download.sass",
                    code: FooterDownloadSassCode
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

const Template = (args) => Download(args);

export const darkDownload = Template.bind({})

darkDownload.args = {
    downloadText: "Download Ombré app on:",
    googlePlay: "/google-play@3x.png",
    googlePlayAlt: JSON.parse(config)[0]["google-play-alt"],
    googlePlayLink: JSON.parse(config)[0]["google-play-link"],
    appStore: "/app-store@3x.png",
    appStoreAlt: JSON.parse(config)[0]["app-store-alt"],
    appStoreLink: JSON.parse(config)[0]["app-store-link"],
    mode: "Dark"
};

darkDownload.parameters = {
    docs: {
        source: {
            code: Download(darkDownload.args)
        }
    }
}

export const lightDownload = Template.bind({})

lightDownload.args = {
    downloadText: "Download Ombré app on:",
    googlePlay: "/google-play@3x.png",
    googlePlayAlt: JSON.parse(config)[0]["google-play-alt"],
    googlePlayLink: JSON.parse(config)[0]["google-play-link"],
    appStore: "/app-store@3x.png",
    appStoreAlt: JSON.parse(config)[0]["app-store-alt"],
    appStoreLink: JSON.parse(config)[0]["app-store-link"],
    mode: "Light"
};

lightDownload.parameters = {
    docs: {
        source: {
            code: Download(lightDownload.args)
        }
    }
}