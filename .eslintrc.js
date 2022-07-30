module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: [
    'react',
    'import-newlines',
    'eslint-plugin-testing-library',
    'jest-dom',
    'import-newlines',
  ],
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
        minProperties: 2,
      },
    ],
    'no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
      },
    ],
    'import-newlines/enforce': [
      'error',
      {
        items: 1,
        'max-len': 120,
        semi: false,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
      },
    ],
    'react/jsx-filename-extension': 2,
  },
};
