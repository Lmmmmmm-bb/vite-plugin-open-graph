# Repository Guidelines

## Project Structure & Module Organization

This repository contains a TypeScript Vite plugin that converts Open Graph options into `<meta>` descriptors.

- `src/index.ts` exposes the plugin and public types.
- `src/transform.ts` builds Vite HTML tag descriptors; `src/utils.ts` handles key conversion and nested attributes.
- `src/types/` defines the public Open Graph, Twitter, and Facebook option shapes.
- `test/` contains Vitest tests, fixtures, and snapshots under `test/__snapshots__/`.
- `playground/` is a small workspace package for manual browser checks.
- `tsdown.config.ts`, `tsconfig.json`, and `eslint.config.js` control building, type checking, and linting.

Keep public API changes in `src/types/` aligned with transformation behavior and README examples.

## Build, Test, and Development Commands

Use the pinned pnpm version from `package.json` (currently pnpm 10).

- `pnpm install` installs all workspace dependencies.
- `pnpm build` produces ESM, CommonJS, and declaration output in `dist/`.
- `pnpm dev` rebuilds the plugin in watch mode.
- `pnpm play` starts the Vite playground for manual verification.
- `pnpm test --run` runs the Vitest suite once; `pnpm test` starts watch mode locally.
- `pnpm typecheck` runs strict TypeScript checks without emitting files.
- `pnpm lint` applies ESLint fixes. Review its changes before committing.

Before opening a PR, run `pnpm build && pnpm typecheck && pnpm test --run && pnpm lint`.

## Coding Style & Naming Conventions

Follow the Antfu ESLint configuration and existing TypeScript style: two-space indentation, single quotes, semicolons, braces for control flow, and 1TBS brace placement. Use `camelCase` for variables/functions, `PascalCase` for exported types, and uppercase snake case for constants such as `EXCEPTION_FIELD`. Preserve explicit `.ts` extensions in local imports. Prefer small pure helpers and strict, exported types over untyped objects.

## Testing Guidelines

Tests use Vitest. Place tests in `test/*.test.ts`, group behavior with `describe`, and use focused `it` descriptions. Cover ordinary values, nested metadata, numeric values, arrays, and edge cases. Snapshot changes must be intentional; update them with `pnpm test --run -u` and inspect the diff.

## Commit & Pull Request Guidelines

History follows Conventional Commit-style prefixes such as `fix:`, `test:`, `build:`, `ci:`, and `chore:`. Keep subjects imperative and scoped to one change. PRs should explain the user-visible behavior, link relevant issues, and list verification performed. Include updated tests/snapshots for output changes and playground screenshots only when visual behavior is relevant.
