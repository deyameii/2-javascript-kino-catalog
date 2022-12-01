/** @type {import('tailwindcss').Config} */
module.exports = {

	content: {
		relative: true,
		files: [
			'index.html',
			'/src/**/*.{html,js}'
		]
	},
	theme: {
		extend: {
			transitionTimingFunction: {
				DEFAULT: 'ease-in-out',
			},
			transitionDuration: {
				'DEFAULT': '400ms'
			},
			colors: {
				'main-blue': '#76A9FA',
				'custom-rgba': 'rgba(0, 0, 0, 0.8)',
				'custom-rgba-2': 'rgba(0, 0, 0, 0.2)'
			}
		}
	},
	plugins: [
		require('prettier-plugin-tailwindcss')
	]
}