# ArtQuiz

## Description

ArtQuiz is a quiz app for masterpieces and their authors.

## [Demo](http://art-quiz.vercel.app/)

## Tech stack:

- react
- typescript
- react-router-dom
- reduxjs/toolkit
- framer-motion
- classnames

## Linters:

- prettier
- eslint

## Development

Use Node.js 22.12+ (Node 22 is selected in `.nvmrc` and CI).

```sh
npm ci
npm start
```

The app uses Vite. `npm run build` checks TypeScript and writes the production
site to `build/`; `npm run preview` serves that build locally. Vercel's build
and SPA fallback are configured in `vercel.json` so direct quiz links work.

## Checks and dependency updates

```sh
npm run lint
npm test
npm run build
npm audit
```

CI runs these checks for pull requests and pushes to `master`. Dependabot opens
weekly grouped dependency updates. Review and merge security updates promptly;
GitHub resolves dependency alerts after the fixed lockfile reaches the default
branch. Notifications remain enabled according to your GitHub account settings.

The scoped `minimatch` override upgrades versions 7–10 to the fixed 11.x line
for GHSA-g3hv-75wg-m249 while leaving the separate 3.x API used by ESLint
unchanged. Remove it once upstream TypeScript ESLint uses the fixed version.
