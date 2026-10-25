# Jacob Noe portfolio

React, TypeScript, and Vite portfolio for production engineering and experimental software. The site includes separate case studies for Hero Services, ORBIT, the AI memory harness, and WHORL, plus the existing Manifold study.

## Run locally

Requires Node 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

## Verify

```sh
npm test
npm run build
```

Tests cover the existing address-bus implementation, external-store control, instrument behavior, and project navigation. The build type-checks the application and emits actual HTML entry points for each known route. This keeps direct project links and refreshes working on static hosting.

## Hosting

| Target | Build command | Output | Base path |
| --- | --- | --- | --- |
| Cloudflare Pages | `npm run build` | `dist` | `/` |
| GitHub project Pages | `npm run build:github` | `dist` | `/portfolio/` locally; repository name selected automatically in CI |
| GitHub user Pages or custom domain | `VITE_BASE_PATH=/ npm run build:github` | `dist` | `/` |

The GitHub workflow checks tests and builds on pull requests, and deploys pushes to `main`. Enable GitHub Actions as the publishing source in repository Settings → Pages. For a custom domain on a project repository, set the workflow base path to `/`.

For Cloudflare Pages, connect the same repository through Git integration, select `main`, use `npm run build`, and set the output directory to `dist`. Set `NODE_VERSION=22`. The static source is shared; no framework migration is needed.

## Content and project source

- `src/content/projects.ts`: project descriptions, status, implementation, and limitations.
- `src/shell/route-data.json`: route registry shared by navigation and static HTML generation.
- `src/pages/LabPage.tsx`: collaboration principles and learning priorities.
- `src/credits.ts`: existing public collaborator roster, preserved.
- `src/labs/manifold`: preserved interactive address-routing experiment and tests.
- `public/resume.docx`: current résumé working draft; replace with the finalized résumé before publication.

Project descriptions currently reflect Jacob Patrick's supplied account and handoff. ORBIT, the memory harness, and WHORL source are not bundled in this repository. Add links after those separate repositories have been reviewed and prepared. There are no fabricated repository or demo links.

## API demonstration

This revision is a static portfolio, with no server endpoints.

After reviewing the project code, select one small, meaningful endpoint (for example, a synthetic retrieval trace). Cloudflare Pages Functions can serve it from a root `functions/api/` directory, separate from `dist`. A GitHub Pages frontend can call that API at its Cloudflare URL; the API must explicitly allow the GitHub site's origin through CORS. Cloudflare's frontend can use same-origin requests. Keep the static case study useful when the API is unavailable.

Do not port the Python harness or ORBIT analysis blindly into the JavaScript Functions runtime. Select the backend runtime after inspecting the implementation.

## References

- https://vite.dev/guide/static-deploy.html
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/functions/get-started/

