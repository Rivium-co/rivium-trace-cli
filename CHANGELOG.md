# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2026-08-15

### Changed
- Renamed `--dsn` to `--project` and `RIVIUM_TRACE_DSN` to `RIVIUM_TRACE_PROJECT` — the value users copy from the dashboard is a project ID, not a DSN.
- `--dsn` and `RIVIUM_TRACE_DSN` still work as aliases so existing CI configs don't break.

## [0.1.0] - 2026-08-15

### Added
- Initial release.
- `rivium-trace sourcemaps upload <dir>` — upload all `.map` files in a directory to a Rivium Trace release.
- Personal access token authentication (`--token` or `RIVIUM_TRACE_TOKEN` env var).
- Self-hosted support via `--api-url` or `RIVIUM_TRACE_API_URL` env var.
- `--dry-run` flag to preview uploads without sending.
