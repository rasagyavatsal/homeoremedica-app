# HomeoRemedica

Retrieval-augmented chat over seven historical homoeopathic books (Allen, Boericke, Clarke, Hahnemann,
Kent) that answers with cited passages. Historical reference only; not medical advice.

**Live:** <https://homeoremedica.com>

This repository is the React web app. It calls the API in
[homeoremedica-server](https://github.com/rasagyavatsal/homeoremedica-server); the Android client is
[homeoremedica-android](https://github.com/rasagyavatsal/homeoremedica-android).

## Setup

Requires Node.js 22.18+ (24 recommended) and a `homeoremedica-server` checkout next to this one, set up
as its README says.

```sh
git clone https://github.com/rasagyavatsal/homeoremedica-server.git ../homeoremedica-server
npm ci
```

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_ORIGIN` | None (same origin) | API origin the built app calls, read at build time. |

## Run

```sh
(cd ../homeoremedica-server && npm run dev)   # API on http://127.0.0.1:8000
npm run dev                                   # web app on http://127.0.0.1:5173, /api proxied to it
```

Port 5173 must be free; Vite fails rather than switching ports. The API's request and response shapes are
in `src/web/contracts.ts`, a copy of the server's `src/contracts.ts`:

```sh
npm run contracts   # copy ../homeoremedica-server/src/contracts.ts after it changes
```

## Test

```sh
npm run check                     # type-check, unit tests, build
npx playwright install chromium   # once, before the e2e tests
npm run e2e                       # built app in Chromium, desktop and phone sizes
npm run e2e -- --ui               # the same, watching them run
npm run e2e:smoke                 # one real question through ../homeoremedica-server with its .env keys
```

`npm run e2e` needs no keys. From `../homeoremedica-server` it starts `e2e/server.ts`, which scripts the
answers, on port 8100, and the Firebase Auth and Firestore emulators on ports 9099 and 8086, which need
Java 21+. It serves this app on port 8102, built to call that server.

## Deploy

| | Prod | Dev |
|---|---|---|
| Project | `homeoremedica` | `homeoremedica-dev-1` |
| Web (Firebase Hosting) | `https://homeoremedica.com` | `https://homeoremedica-dev-1.web.app` |
| API it calls | `https://homeoremedica-619837289655.asia-south1.run.app` | `https://homeoremedica-119730286024.asia-south1.run.app` |
| Deploys on | a release from `main` | every push to `branch` |

```sh
VITE_API_ORIGIN=<API URL> npm run build         # web app that calls that API
npm run deploy                                  # Hosting for prod
GCP_PROJECT=homeoremedica-dev-1 npm run deploy  # Hosting for dev
```

Merging release-please's PR on `main` tags a `v*` release, which runs the `Deploy` workflow for prod;
`Deploy dev` runs it for dev on each push to `branch`. It checks out `homeoremedica-server` at the same
branch and fails when the two copies of the contracts differ. The projects and their Workload Identity
setup are described in homeoremedica-server's README.

## License

Software and documentation: [MIT](LICENSE). The dataset is proprietary and lives in
[homeoremedica-private](https://github.com/rasagyavatsal/homeoremedica-private).
