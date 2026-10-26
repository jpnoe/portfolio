# Jacob Noe — portfolio

Personal portfolio built with React, TypeScript, and Vite. It presents case studies for:

- **Hero Services**: a production web and mobile platform for water and wastewater operations.
- **[Associative memory harness](https://github.com/jpnoe/memory-harness)**: cognitive-inspired memory retrieval for conversational AI.
- **[ORBIT](https://github.com/jpnoe/orbit)**: an Android app for longitudinal behavioral logging and state-space analysis.
- **[WHORL](https://github.com/jpnoe/whorl)**: a Hall-sensor fidget spinner used as a MIDI controller.

The site also documents the collaborative AI workflow, verification practices, and project-level attribution used across the independent work.

## Run locally

Requires Node 22.12 or newer.

```sh
npm ci
npm run dev
```

## Test and build

```sh
npm test
npm run build
```

The build type-checks the app and emits an HTML entry point for every route, so direct links and refreshes work on static hosting.

## Deployment

| Target | Build command | Base path |
| --- | --- | --- |
| Cloudflare Pages | `npm run build` | `/` |
| GitHub project Pages | `npm run build:github` | repository name, selected automatically in CI |
| GitHub user Pages or custom domain | `VITE_BASE_PATH=/ npm run build:github` | `/` |

All targets output to `dist`. The GitHub workflow runs tests and builds on pull requests and deploys pushes to `main`.

