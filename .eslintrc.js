module.exports = {
  plugins: ['@typescript-eslint', 'eslint-comments', 'jest', 'promise', 'unicorn'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    'class-methods-use-this': 'off',
    // Allow disable rules for whole file
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'unicorn/catch-error-name': 'off',
    'no-console': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-dynamic-require': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jest/no-test-callback': 'off',
    'no-plusplus': 'off',
    'unicorn/no-for-loop': 'off',
    'unicorn/prefer-spread': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-unneeded-ternary': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'lines-between-class-members': 'off',
    'no-restricted-syntax': 'off',
    'jest/expect-expect': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
  },
};
