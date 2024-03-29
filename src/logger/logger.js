import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

// create pino-logflare console stream for serverless functions and send function for browser logs
const { stream, send } = logflarePinoVercel({
  apiKey: process.env.PINO_KEY,
  sourceToken: process.env.PINO_TOKEN,
});

// create pino logger
const logger = pino({
  browser: {
    transmit: {
      level: 'info',
      send,
    },
  },
  level: 'debug',
  base: {
    env: process.env.VERCEL_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
}, stream);

export default logger;
