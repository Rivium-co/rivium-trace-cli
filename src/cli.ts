#!/usr/bin/env node
import { Command } from 'commander';
import { sourcemapsUpload } from './commands/sourcemaps-upload';
import pc from 'picocolors';

const pkg = require('../package.json');

const program = new Command();

program
  .name('rivium-trace')
  .description('Command-line tool for Rivium Trace')
  .version(pkg.version, '-v, --version', 'output the version number');

const sourcemaps = program
  .command('sourcemaps')
  .description('Manage sourcemaps for release stack trace resolution');

sourcemaps
  .command('upload <directory>')
  .description('Upload every .map file in <directory> to a Rivium Trace release')
  .requiredOption('--dsn <dsn>', 'Project DSN (from the Trace dashboard)')
  .requiredOption('--release <version>', 'Release version this bundle belongs to (e.g. "1.2.3")')
  .option('--token <token>', 'Personal access token (rv_pat_xxx). Falls back to RIVIUM_TRACE_TOKEN env var')
  .option('--api-url <url>', 'Override Trace API URL (default: https://trace.rivium.co, or RIVIUM_TRACE_API_URL env var)')
  .option('--dry-run', 'List files that would be uploaded without sending them', false)
  .action(async (directory: string, options: any) => {
    try {
      await sourcemapsUpload({
        directory,
        dsn: options.dsn,
        release: options.release,
        token: options.token,
        apiUrl: options.apiUrl,
        dryRun: options.dryRun,
      });
    } catch (err: any) {
      console.error(pc.red(`\nerror: ${err.message}`));
      process.exit(1);
    }
  });

program.parse();
