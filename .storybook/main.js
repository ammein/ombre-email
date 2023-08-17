const path = require('path');

module.exports = {
	"stories": [
		"../docs/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)"
	],
	"plugins": [
		require('autoprefixer')
	],
	"addons": [
		"@storybook/addon-links",
		"storybook-code-panel/register",
		{
			name: '@storybook/addon-essentials',
			options: {
				// To remove actions tab. Not necessary since email does not allow actions
				actions: false,
			},
		},
		"storybook-zeplin/register"
	],
	staticDirs: [
		'../templates/ombre/assets/optimised',
		'../docs/stories/assets' 
	],
	"framework": "@storybook/html",
	webpackFinal: async (config, {
		configType
	}) => {
		// Push Sass Loader that import from project library
		config.module.rules.push({
			test: /\.s[ac]ss$/i,
			use: [
				"style-loader",
				"css-loader",
				{
					loader: "sass-loader",
					options: {
						implementation: require("sass")
					}
				},
				// Using global sass folder
				{
					loader: 'sass-resources-loader',
					options: {
						// Provide path to the file with resources
						resources: path.resolve(__dirname, "../templates/ombre/global.sass"),
					},
				},
			]
		});


		return config;
	}
}