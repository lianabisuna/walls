const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
			/**
			 * Tind & Shade Generator: https://maketintsandshades.com
			 */
      colors: {
				primary: '##7158d7', // periwinkle
				secondary: 'e6f658', // jackfruit
				dark: '#252525', // not pure black
				light: '#fffff0', // not pure white
				// accent: '#',
				// success: '#',
				// error: '#',
				// alert: '#',
				// info: '#',
      }
    },
  },
}