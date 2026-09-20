import chokidar from 'chokidar';
import path from 'node:path';

import { generate } from './generate';

const ROOT_DIR = process.cwd();

const DEFINITIONS_DIR = path.resolve(ROOT_DIR, 'src/definitions');

const WATCH_EXTENSIONS = new Set(['.ts', '.js', '.mjs', '.mts']);

async function main() {
  /**
   * Initial generation
   */
  console.log('[token] initial generate...');

  await generate();

  console.log('[token] initial generate completed.');

  let timer: ReturnType<typeof setTimeout> | undefined;

  let generating = false;
  let pending = false;

  /**
   * Regenerate with debounce.
   */
  const regenerate = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      /**
       * If another generation is running,
       * mark it as pending.
       */
      if (generating) {
        pending = true;
        return;
      }

      generating = true;

      try {
        console.log('[token] generating...');

        await generate();

        console.log('[token] generated.');
      } catch (error) {
        console.error('[token] generate failed:', error);
      } finally {
        generating = false;

        /**
         * If files changed while generation
         * was running, generate once more.
         */
        if (pending) {
          pending = false;
          regenerate();
        }
      }
    }, 100);
  };

  const watcher = chokidar.watch(DEFINITIONS_DIR, {
    ignoreInitial: true,

    /**
     * Ignore hidden files/directories.
     */
    ignored: (filePath, stats) => {
      const basename = path.basename(filePath);

      if (basename.startsWith('.')) {
        return true;
      }

      /**
       * Keep directories.
       */
      if (stats?.isDirectory()) {
        return false;
      }

      /**
       * Only watch token definition files.
       */
      return !WATCH_EXTENSIONS.has(path.extname(filePath));
    },

    /**
     * Do not follow symbolic links.
     */
    followSymlinks: false,

    /**
     * Wait until the initial directory
     * scan is finished.
     */
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: 10,
    },
  });

  watcher.on('ready', () => {
    console.log(`[token] watching: ${DEFINITIONS_DIR}`);
  });

  watcher.on('add', (filePath) => {
    console.log(`[token] add: ${filePath}`);

    regenerate();
  });

  watcher.on('change', (filePath) => {
    console.log(`[token] change: ${filePath}`);

    regenerate();
  });

  watcher.on('unlink', (filePath) => {
    console.log(`[token] unlink: ${filePath}`);

    regenerate();
  });

  watcher.on('error', (error) => {
    console.error('[token] watcher error:', error);
  });

  /**
   * Graceful shutdown.
   */
  const shutdown = async () => {
    console.log('[token] stopping watcher...');

    if (timer) {
      clearTimeout(timer);
    }

    await watcher.close();

    process.exit(0);
  };

  process.on('SIGINT', shutdown);

  process.on('SIGTERM', shutdown);
}

main().catch((error) => {
  console.error('[token] watcher failed:', error);

  process.exit(1);
});
