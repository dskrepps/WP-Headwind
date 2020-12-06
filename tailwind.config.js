/**
 * Configures TailwindCSS, including setting up our color scheme
 */

const colors = require('tailwindcss/colors.js');

module.exports = {
	purge: {
		content: [
			// Classes not in these files will be purged, unless safelisted
			'./**/*.php',
			'./assets/images/**/*.svg',
			'./../../mu-plugins/app/src/components/**/*.php',
		],
		options: {
			safelist: [
				// Example: /^(bg|text)-primary-\d+$/,
			],
		}
	},
	
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
		colors: {
			//
			//  Our default color scheme will be configurable by defining these var in the <head> template
			//
			primary: {
				'100': 'var(--primary-100)', '200': 'var(--primary-200)', '300': 'var(--primary-300)',
				'400': 'var(--primary-400)', '500': 'var(--primary-500)', '600': 'var(--primary-600)',
				'700': 'var(--primary-700)', '800': 'var(--primary-800)', '900': 'var(--primary-900)',
			},
			secondary: {
				'100': 'var(--secondary-100)', '200': 'var(--secondary-200)', '300': 'var(--secondary-300)',
				'400': 'var(--secondary-400)', '500': 'var(--secondary-500)', '600': 'var(--secondary-600)',
				'700': 'var(--secondary-700)', '800': 'var(--secondary-800)', '900': 'var(--secondary-900)',
			},
			tertiary: {
				'100': 'var(--tertiary-100)', '200': 'var(--tertiary-200)', '300': 'var(--tertiary-300)',
				'400': 'var(--tertiary-400)', '500': 'var(--tertiary-500)', '600': 'var(--tertiary-600)',
				'700': 'var(--tertiary-700)', '800': 'var(--tertiary-800)', '900': 'var(--tertiary-900)',
			},
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			gray:      colors.coolGray,
			// Built-in choices: https://tailwindcss.com/docs/customizing-colors#color-palette-reference
		},
		extend: {}
	},
	
	variants: {
		extend: {}
	},
	
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
}
