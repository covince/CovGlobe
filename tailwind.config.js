const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const covinceConfig = require('covince/tailwind.config')

module.exports = {
  ...covinceConfig,
  purge: {
    content: [
      './src/**/*.jsx',
      './node_modules/covince/src/**/*.jsx'
    ]
  },
  darkMode: 'class',
  theme: {
    ...covinceConfig.theme,
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      heading: ['Roboto Condensed', 'Roboto', 'sans-serif']
    },
    extend: {
      ...covinceConfig.theme.extend,
      colors: {
        // ...covinceConfig.theme.extend.colors,
        gray: colors.slate,
        primary: 'rgb(60, 154, 216)',
        heading: 'rgb(51, 51, 51)',
        subheading: 'theme("colors.gray.500")',
        dark: {
          primary: 'rgb(60, 154, 216)',
          heading: 'rgb(51, 51, 51)',
          subheading: 'theme("colors.gray.500")'
        }
      },
      spacing: {
        ...covinceConfig.theme.extend.spacing,
        header: defaultTheme.spacing[16],
        'header-md': defaultTheme.spacing[20],
        'header-overlap': '0.25rem'
      }
      // gridTemplateRows: {
      //   '1-full': '100%'
      // }
    }
  },
  variants: {
    extend: {}
  }
}
