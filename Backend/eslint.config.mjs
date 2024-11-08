import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs as tseslint } from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      // Enforce single quotes for strings
      'quotes': ['error', 'single'],

      // Require semicolons at the end of statements
      'semi': ['error', 'always'],

      // Disallow unused variables
      'no-unused-vars': ['warn'],

      // Prefer `const` over `let` for variables that are not reassigned
      'prefer-const': 'error',

      // Require `===` and `!==` instead of `==` and `!=`
      'eqeqeq': ['error', 'always'],

      // Allow trailing commas in types (TypeScript)
      '@typescript-eslint/member-delimiter-style': [
        'error', 
        {
          multiline: {
            delimiter: 'none',
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },
        }
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint,
];
