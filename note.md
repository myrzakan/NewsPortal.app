





1 Закончить аторизацию и регистрацию +
2 Сделать аторизация через Google +
3 Сделать комметрие для сайта +
4 Сделать страницу NotFound +
5 Сделать isloading +
6 Разделение ролей -
7 Переобновить Admin Panel +
8 Адаптация сайта   



настроить eslink

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'import'],
  rules: {
    'react/display-name': 'off',
    'no-unused-vars': 'off',
    quotes: ['error', 'single'],
    camelcase: 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'no-use-before-define': 'off',
    'no-undef': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-useless-return': 'off',
    semi: ['error', 'never'],
    indent: ['error', 2],
    'no-console': 'off',
    'no-const-assign': 'error',
    'no-duplicate-case': 'error',
    'no-var': 'error',
    'no-empty': 'error',
    'keyword-spacing': 'error',
    'no-trailing-spaces': 'error',
    'max-len': 'off',
    'object-curly-spacing': ['error', 'always'],
    'react/prop-types': 'off',
    'arrow-parens': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-children-prop': 'off', // Добавьте запятую здесь
    'require-jsdoc': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Встроенные модули Node.js
          'external', // Внешние модули из node_modules
          'internal', // Модули вашего проекта
          ['parent', 'sibling', 'index'], // Относительные импорты внутри проекта
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
