import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';

const rootDir = dirname(fileURLToPath(import.meta.url));

const read = (filename: string) => {
  const fullPath = resolve(rootDir, filename);
  return existsSync(fullPath)
    ? readFileSync(fullPath, 'utf-8')
    : '{}';
} 

export const devConfigurationMiddleware = (): Plugin => ({
  name: 'static-configuration-response',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/configuration.json') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(read('configuration.local.json'));
        return;
      }
      next();
    });
  }
});
