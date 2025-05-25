<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Copilot Instructions

This project uses Vue 3 with TypeScript and SCSS. Follow the conventions below when generating or modifying code.

## Component Structure

- Use the `<script setup>` syntax exclusively.
- Use the Composition API for all component logic.
- Keep all logic inside the script section.
- Avoid placing any logic in the template section.
- Use the `<template>` section strictly for HTML structure.
- Use `v-model` for all two-way data bindings.
- Always define component names in PascalCase.
- Use camelCase for all variables and method names.
- Leave one empty line between all method definitions.
- Keep logic and rendering concerns separated and organized.

## Typing and Data Safety

- Use strong typing throughout all code.
- Avoid using the `any` type wherever possible.
- Define shared and reusable types in the `types/` folder.

## Logging and Debugging

- Add descriptive console log statements for debugging.
- Ensure all debug logs are only visible in development mode.

## Styling

- Use a minimalist dark theme for all UI components.
- Use SCSS for all styles.
- Use BEM (Block Element Modifier) naming conventions for CSS classes.
- Use `scoped` styles in Vue components to avoid global style conflicts.
- Use the `lang="scss"` attribute in the `<style>` tag for SCSS files.
- Use CSS variables for colors and common styles defined in `variables.scss`.
- Do not use inline styles under any circumstance.
- Use shared CSS classes from `main.scss` whenever applicable.
- Leave one empty line between all css classes definitions.

## Project Organization

- Files are organized by feature for clarity and maintainability.

## Testing

- Ensure all logic-heavy components have corresponding test coverage.
- Follow consistent test structure in the `tests/` directory.

## Linting and Formatting

- Follow all ESLint rules defined in `.eslintrc.js`.
  - These rules enforce code quality, naming conventions, and type safety.
- Use Prettier for formatting all code files.
  - Maintain consistent formatting using `.prettierrc` settings.
- Do not ignore or disable linting or formatting rules unless explicitly justified.
- Ensure all code passes lint and format checks before committing.

## Vue 3 Compiler Macros

- Do not import `defineProps`, `defineEmits`, or `defineExpose` in `<script setup>` blocks. These are compiler macros and should be used without import statements.
