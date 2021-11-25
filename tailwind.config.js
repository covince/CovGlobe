const defaultTheme = require('tailwindcss/defaultTheme')

const covinceConfig = require('covince/tailwind.config')

module.exports = {
  ...covinceConfig,
  purge: {
    content: [
      './src/**/*.jsx',
      './node_modules/covince/src/**/*.jsx'
    ]
  },
  // darkMode: false, // or 'media' or 'class'
  theme: {
    ...covinceConfig.theme,
    extend: {
      ...covinceConfig.theme.extend,
      // colors: {
      //   gray: colors.blueGray,
      //   primary: colors.blue[700],
      //   heading: 'theme("colors.gray.600")',
      //   subheading: 'theme("colors.gray.500")'
      // },
      spacing: {
        // ...covinceConfig.theme.extend.spacing,
        header: defaultTheme.spacing[16],
        'header-md': defaultTheme.spacing[32],
        18: defaultTheme.spacing[12] // TODO: fix this
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
