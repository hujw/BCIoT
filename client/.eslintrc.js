module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: ['react'],
  env: {
    'browser': true
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
