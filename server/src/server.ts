import { createApp } from './app';
import { env } from './env';
import { prisma } from './db';
import { logger } from './util/logger';

const app = createApp();

const server = app.listen(env.port, () => {
  logger.serverRunning(env.port, env.nodeEnv);
});

// כיבוי מסודר
async function shutdown() {
  logger.serverClosing();
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
