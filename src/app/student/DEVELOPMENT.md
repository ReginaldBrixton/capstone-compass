# Development Guidelines

## Code Style
- Max line length: 80 characters
- Indent style: Spaces
- Indent size: 2 spaces
- End of line: LF (Unix-style)
- Charset: UTF-8
- Trim trailing whitespace: true
- Insert final newline: true

## JavaScript/JSX
- JSX quotes: Double quotes
- Semicolons: Required
- Trailing commas: ES5 style
- Arrow function parentheses: Always
- Bracket spacing: true
- JSX brackets same line: false

## Component Structure
- Components: `src/app/components`
- Styles: `src/app/styles`
- Utilities: `src/app/utils`
- Hooks: `src/app/hooks`
- Contexts: `src/app/contexts`

## Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case

## Import Order
1. React
2. Next.js
3. @/components
4. @/styles
5. @/utils
6. @/hooks
7. @/contexts
8. Local files

## Performance
- Code splitting: Enabled
- Lazy loading: Enabled
- Image optimization: Enabled

## Accessibility
- ARIA labels: Required
- Semantic HTML: Required
- Keyboard navigation: Required

## Documentation
- Component docs: Required
- Function docs: Required
- Prop types: Required

## Testing
- Unit tests: Required
- Integration tests: Required
- Test coverage: 80% minimum

## State Management
- Prefer hooks: true
- Prefer context: true
- Prefer Redux: false

## CSS
- Vanilla CSS: Preferred
- CSS Modules: Disabled
- CSS-in-JS: Disabled
- Tailwind: Enabled

## Build
- Minification: Enabled
- Tree shaking: Enabled
- Source maps: Enabled

## Dependencies
- Package manager: Bun
- Node version: >=18.0.0 