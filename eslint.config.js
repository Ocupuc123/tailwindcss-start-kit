import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['src/scripts/vendor/*']),
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      sonarjs,
      unicorn
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'import/no-named-as-default': 'off',
      'no-console': 'error',
      'no-unused-vars': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'off',
      semi: ['error', 'always'],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      'sonarjs/cognitive-complexity': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-unused-collection': 'off',
      'unicorn/prefer-dom-node-dataset': 'off',
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'never'
      }],
      'id-length': ['error', {
        exceptions: ['$']
      }]
    }
  }
]);
