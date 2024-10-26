import js from '@eslint/js'
import markdown from '@eslint/markdown'
import astroParser from 'astro-eslint-parser'
import prettier from 'eslint-config-prettier'
import astro from 'eslint-plugin-astro'
import * as regexpPlugin from 'eslint-plugin-regexp'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import ts from 'typescript-eslint'

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
      'plugins/og-template',
      '**/*.md',
    ],
  },

  // https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
  js.configs.recommended,
  // ...ts.configs.recommendedTypeChecked,
  // ...ts.configs.stylisticTypeChecked,
  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  regexpPlugin.configs['flat/recommended'],

  {
    // https://eslint.org/docs/latest/use/configure/language-options
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,

        ...globals.node,
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

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
    },
  },
  {
    // Apply the Markdown processor to all .md files
    files: ['**/*.md'],
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ['.md'],
      },
    },

    plugins: {
      markdown,
    },

    rules: {
      // Markdown rules
      'markdown/fenced-code-language': 'warn', // Enforce language specification in fenced code blocks
      'markdown/heading-increment': 'error', // Ensure heading levels increment by one
      'markdown/no-duplicate-headings': 'warn', // Disallow duplicate headings in the same document
      'markdown/no-empty-links': 'warn', // Disallow empty link elements
      'markdown/no-html': 'error', // Disallow HTML in Markdown
      'markdown/no-invalid-label-refs': 'error', // Disallow invalid label references
      'markdown/no-missing-label-refs': 'error', // Disallow missing label references
    },
  },
  {
    files: ['**/*.md/*.js', '**/*.md/*.ts'],
    extends: [ts.configs.disableTypeChecked],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // 'import/no-unresolved': 'warn',
    },
  },
  prettier
)
