module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 0,
      'nesting-rules': true
    }
  }
}