import pino from 'pino';

// create pino logger
const logger = pino({
  level: 'debug',
  base: {
    env: process.env.VERCEL_ENV,
    revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
  },
});

export default logger;
