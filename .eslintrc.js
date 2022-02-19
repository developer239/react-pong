module.exports = {
  extends: [
    '@linters/eslint-config-react',
    '@linters/eslint-config-typescript',
    '@linters/eslint-config-jest',
    'prettier',
  ],
  rules: {
    // Allow x, y
    'id-length': 0,
    // TODO: update the package
    'react/react-in-jsx-scope': 0
  }
}
