/* eslint-disable import/no-webpack-loader-syntax */
import {
    Content
} from './Content';
import {
    htmlConverterReact
} from 'html-converter-react';
import globalSassRawCode from "!!raw-loader!../../templates/ombre/global.sass";
import TitleSassRawCode from "!!raw-loader!../../templates/ombre/components/Title/Title.sass";
import DescriptionSassRawCode from "!!raw-loader!../../templates/ombre/components/Description/Description.sass";
import DarkSassRawCode from "!!raw-loader!../../templates/ombre/dark.sass";
import ContentDocs from "./Content.mdx";

const defaultParams = {
    // Markdown Docs
    docs: {
        page: ContentDocs
    }
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
    title: 'Content/Wrapper Content',
    id: 'content',
    // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
    argTypes: {
        title: {
            name: 'Title',
            description: 'Dummy Text Content',
            control: 'text'
        },
        description: {
            name: 'Description',
            description: 'Dummy Text Content',
            control: 'text'
        },
        mode: {
            name: "Mode",
            description: "Mode Background Color",
            table: {
                disable: true
            }
        }
    },
    parameters: {
        layout: "centered",
        zeplinLink: [
            {
                name: "Dark Content",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=62625228aec87810b8280c66"
            }, 
            {
                name: "Light Content",
                link: "zpl://components?pid=62582b42e21a4d8d83001321&coids=62625228538e84ab9d9dd392"
            }
        ],
        // Code Display
        storybookCodePanel: {
            disabled: false,
            files: [{
                    fileName: 'Title.sass',
                    code: TitleSassRawCode
                },
                {
                    fileName: 'Description.sass',
                    code: DescriptionSassRawCode
                },
                {
                    fileName: 'global.sass',
                    code: globalSassRawCode
                },
                {
                    fileName: 'dark.sass',
                    code: DarkSassRawCode
                }
            ]
        }
    }
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (args) => htmlConverterReact(Content(args))

export const darkContent = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
darkContent.args = {
    title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, ipsum nulla tempora delectus voluptate eligendi ipsam quam deserunt repellat repudiandae iusto soluta repellendus harum labore nostrum quibusdam minima at quas!",
    mode: "Dark"
};

darkContent.parameters = {
    ...defaultParams.storybookCodePanel,
    docs: {
        ...defaultParams.docs,
        source: {
            code: Content(darkContent.args)
        }
    }
}

export const lightContent = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
lightContent.args = {
    title: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro, ipsum nulla tempora delectus voluptate eligendi ipsam quam deserunt repellat repudiandae iusto soluta repellendus harum labore nostrum quibusdam minima at quas!",
    mode: "Light"
};

lightContent.parameters = {
    ...defaultParams.storybookCodePanel,
    docs: {
        ...defaultParams.docs,
        source: {
            code: Content(lightContent.args)
        }
    }
}