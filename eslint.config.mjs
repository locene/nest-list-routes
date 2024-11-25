import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config({
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
        parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: __dirname,
            sourceType: 'module',
        },
    },
    ignores: ['dist/**/*'],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.stylistic,
        stylistic.configs.customize({
            quotes: 'single',
            semi: true,
            indent: 4,
        }),
    ],
    plugins: {
        'simple-import-sort': simpleImportSort,
        'unused-imports': unusedImports,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-require-imports': 'warn',
        'simple-import-sort/imports': ['error', {
            groups: [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']],
        }],
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'warn',
    },
});
