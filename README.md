# @rivium-trace/cli

Command-line tool for [Rivium Trace](https://rivium.co/trace) — upload sourcemaps and integrate error tracking into your CI/CD pipeline.

## Install

Use it with `npx` (no install needed) or add it as a dev dependency:

```bash
npm install --save-dev @rivium-trace/cli
```

## Usage

### Upload sourcemaps

```bash
npx @rivium-trace/cli sourcemaps upload \
  --project <your-project-id> \
  --release "1.2.3" \
  ./sourcemaps
```

That's it. Every `.map` file under `./sourcemaps` is uploaded and tagged with the given release. Rivium Trace will use them to translate minified stack traces into readable source locations.

**Where do I find my project ID?** Open your project in the Rivium Trace dashboard — the ID appears in the URL:
```
https://console.rivium.co/dashboard/rivium-trace/<PROJECT_ID>/...
```
Or copy it from **Project Settings → Project ID**.

### Authentication

The CLI needs a **personal access token** (not a project API key). Create one at:

**https://console.rivium.co/dashboard/settings/tokens**

Give it the `sourcemaps:write` scope, copy the `rv_pat_xxx` value, and either:

**Environment variable (recommended for CI):**
```bash
export RIVIUM_TRACE_TOKEN=rv_pat_xxx
```

**Or pass it directly:**
```bash
npx @rivium-trace/cli sourcemaps upload --token rv_pat_xxx ...
```

## Options

| Flag | Description | Default |
|---|---|---|
| `--project <id>` | Project ID | `RIVIUM_TRACE_PROJECT` env var |
| `--release <ver>` | Release version this bundle belongs to (required) | — |
| `--token <token>` | Personal access token | `RIVIUM_TRACE_TOKEN` env var |
| `--api-url <url>` | Trace API URL — override for self-hosted | `RIVIUM_TRACE_API_URL` env var or `https://trace.rivium.co` |
| `--dry-run` | Show what would be uploaded without sending | `false` |

## Example: Next.js CI upload

Add this to your CI pipeline right after `next build`:

```bash
#!/bin/bash
set -e

# 1. Build with sourcemaps
npm run build

# 2. Extract sourcemaps to a folder
mkdir -p ./sourcemaps
find .next/static/chunks -name "*.js.map" -exec cp {} ./sourcemaps \;

# 3. Upload to Rivium Trace, tagged with the release version
npx @rivium-trace/cli sourcemaps upload \
  --project "$RIVIUM_TRACE_PROJECT" \
  --release "$NEXT_PUBLIC_APP_VERSION" \
  ./sourcemaps

# 4. Optional: strip .map files from the build output so the browser
#    can't download them (source stays private)
find .next/static/chunks -name "*.js.map" -delete
find .next/static/chunks -name "*.js" -exec sed -i '/^\/\/# sourceMappingURL=/d' {} +
```

Set `RIVIUM_TRACE_TOKEN` and `RIVIUM_TRACE_PROJECT` in your CI environment as secrets.

## Self-hosted Rivium Trace

If you run Rivium Trace on your own infrastructure, point the CLI at your API:

```bash
export RIVIUM_TRACE_API_URL=https://trace.mycompany.com
npx @rivium-trace/cli sourcemaps upload --project ... --release ... ./sourcemaps
```

## Exit codes

- `0` — success
- `1` — any error (invalid token, network failure, upload rejected, etc.)

Suitable for gating a deploy on successful upload.

## Support

- Docs: https://rivium.co/trace
- Issues: https://github.com/Rivium-co/rivium-trace-cli/issues
