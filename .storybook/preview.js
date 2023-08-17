export const parameters = {
  actions: {
    argTypesRegex: "^on[A-Z].*"
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  options:{
    // Sorting Order https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: {
      order: ['Header','Content', 'Footer', 'Button', 'Typography', ['Title', 'Description']],
    },
  },

  // Set background theme using ombré-email background color
  backgrounds: {
    default: 'dark',
    values: [{
        name: 'dark',
        value: '#040303',
      },
      {
        name: 'light',
        value: '#fffcf2',
      },
    ],
  },

  // https://storybook.js.org/addons/storybook-code-panel/
  storybookCodePanel: {
    // Disable by default, enable per story
    disabled: true,
    // For file extensions that don't match Prism language name, map file extension to language
    // See list at: https://prismjs.com/#languages-list
    extensionMapping: {
      hbs: 'handlebars'
    },
    // Optional, when auto-adding files specify allowed file extensions and the order to display
    allowedExtensions: [
      'hbs', 'scss', 'sass', 'css', 'js', 'json'
    ]
  }
}