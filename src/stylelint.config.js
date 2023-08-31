module.exports = {
  root: true,
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-vue'
  ],
  rules: {
    'selector-class-pattern': null,
    'indentation': 2,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global', 'local', 'slotted']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: [':deep', ':global', ':slotted', ':local']
      }
    ]

  },
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss'
    }
  ]
}
