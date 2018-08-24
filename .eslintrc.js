module.exports = {
  extends: [
    'eslint:recommended', // extending recommended config and config derived from eslint-config-prettier
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '6',
    sourceType: 'module',
  },
  rules: {
    'object-curly-spacing': 0,
    'react/prop-types': false,
    'react/react-in-jsx-scope': false,
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^h$',
      },
    ],
  },
  globals: {
    document: true,
    window: true,
    localStorage: true,
    setTimeout: true,
    clearTimeout: true,
  },
};
