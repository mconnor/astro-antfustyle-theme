import globals from 'globals'
import js from '@eslint/js'
import astroParser from 'astro-eslint-parser'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'

export default ts.config(
  {
    // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
    ignores: [
      'dist/',
      '.astro/',
      '.local/',
      '.github/',
      '.eslintcache',
      '.prettierignore',
    ],
  },

  // https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
  js.configs.recommended,
  // ...ts.configs.recommendedTypeChecked,
  // ...ts.configs.stylisticTypeChecked,
  ...ts.configs.recommended,
  ...ts.configs.stylistic,

  {
    // https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: ts.parser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,

        // ...globals.node,
      },
    },
  },
  {
    files: ['*.astro'],
    ...astro.configs.recommended,
    ...astro.configs['jsx-a11y-recommended'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: ts.parser,
      },
      globals: {
        JSX: true,
      },
    },
  },
  {
    rules: {
      // https://typescript-eslint.io/rules/no-unused-vars/
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // https://typescript-eslint.io/rules/triple-slash-reference/
      '@typescript-eslint/triple-slash-reference': [
        'error',
        { path: 'always' },
      ],
      // https://eslint.org/docs/latest/rules/no-unused-expressions
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true },
      ],
    },
  },
  prettier
)
