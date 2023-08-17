/* eslint-disable import/no-webpack-loader-syntax */
import {
  OmbreButton
} from './Button';
import {
  htmlConverterReact
} from 'html-converter-react';
import globalSassRawCode from "!!raw-loader!../../templates/ombre/global.sass";
import ButtonSassRawCode from "!!raw-loader!../../templates/ombre/components/Button/Button.sass";
import DarkSassRawCode from "!!raw-loader!../../templates/ombre/dark.sass";
import ButtonDocs from "./Button.mdx";

const defaultParams = {
  // Markdown Docs
  docs: {
    page: ButtonDocs
  }
}

// More on default export: https://storybook.js.org/docs/html/writing-stories/introduction#default-export
export default {
  title: 'Button/Ombré Button',
  id: 'ombré-button',
  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    label: {
      control: 'text'
    }
  },
  parameters: {
    zeplinLink: [
      {
        name: "Gradient",
        link: "zpl://components?pid=62582b42e21a4d8d83001321&coid=626252285cb2d3ab344c954c"
      }, 
      {
        name: "Fallback",
        link: "zpl://components?pid=62582b42e21a4d8d83001321&coid=62625227aec87810b8280c4b"
      }
    ],
    // To Center layout
    layout: 'centered',
    // Code Display
    storybookCodePanel: {
      disabled: false,
      files: [{
          fileName: 'Button.sass',
          code: ButtonSassRawCode
        },
        {
          fileName: 'global.sass',
          code: globalSassRawCode
        },{
          fileName: 'dark.sass',
          code: DarkSassRawCode
        }
      ]
    }
  }
};

// More on component templates: https://storybook.js.org/docs/html/writing-stories/introduction#using-args
const Template = (args) => htmlConverterReact(OmbreButton(args))

export const Gradient = Template.bind({});
// More on args: https://storybook.js.org/docs/html/writing-stories/args
Gradient.args = {
  label: 'Primary Button',
};

Gradient.parameters = {
  ...defaultParams.storybookCodePanel,
  docs: {
    ...defaultParams.docs,
    source: {
      code: OmbreButton(Gradient.args)
    }
  }
}

export const Fallback = Template.bind({});
Fallback.args = {
  label: 'Fallback Button',
  backgroundColor: "#e5333b"
};

Fallback.parameters = {
  ...defaultParams.storybookCodePanel,
  docs: {
    ...defaultParams.docs,
    source: {
      code: OmbreButton(Fallback.args)
    }
  }
}