const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(primary|secondary|neutral)-(100|500)/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /(bg|text|border)-(primary|secondary|neutral)-(100|500)\/(75|90)/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /(bg|text|border)-(light|dark)/,
      variants: ['hover', 'active'],
    },
    {
      pattern: /(bg|text|border)-(light|dark)\/(75|90)/,
      variants: ['hover', 'active'],
    },
  ],
  theme: {
    extend: {
			/**
			 * @example
			 * 100 to 400 is equal to 80% to 20% lighter shades.
			 * 500 is the default shade.
			 * 600 to 900 is equal to 20% to 80% darker shades.
			 * 
			 * @link https://maketintsandshades.com
			 */
      colors: {
				'primary': {
					100: '#e3def7',
					200: '#c6bcef',
					300: '#aa9be7',
					400: '#8d79df',
					500: '#7158d7',
					600: '#5a46ac',
					700: '#443581',
					800: '#2d2356',
					900: '#17122b',
				}, // periwinkle
				'secondary': {
					100: '#fafdde',
					200: '#f5fbbc',
					300: '#f0fa9b',
					400: '#ebf879',
					500: '#e6f658',
					600: '#b8c546',
					700: '#8a9435',
					800: '#5c6223',
					900: '#2e3112',
				}, // jackfruit
				dark: '#252525', // not pure black
				light: '#fffff0', // not pure white
				accent: colors.rose,
				success: colors.green,
				error: colors.red,
				alert: colors.yellow,
				info: colors.blue,
				'avatar': {
					1: '#B476FB',
					2: '#FBCC41',
					3: '#256CFE',
					4: '#38D7BF',
					5: '#2BB278',
					6: '#FA9D25',
					7: '#FA9D25',
					8: '#EB4258',
				},
      },
			fontSize: {
				'3xs': '0.5rem',
				'2xs': '0.625rem',
			},
    },
    fontFamily: {
      'inter': ['Inter', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
}