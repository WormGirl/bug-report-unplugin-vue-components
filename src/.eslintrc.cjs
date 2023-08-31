module.exports = {
  root: true,
  extends: ['@antfu'],
  overrides: [
    {
      files: ['*.vue', '*.{j,t}s?(x)'],
      rules: {
        '@typescript-eslint/comma-dangle': [2, 'never'],
        'vue/component-tags-order': [2, {
          order: ['script', 'template', 'style'],
        }],
        'vue/component-name-in-template-casing': [2, 'PascalCase', {
          registeredComponentsOnly: false,
          ignores: [],
        }],
      },
    }],
  ignorePatterns: ['node_modules/', 'dist/', 'public/'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
}
