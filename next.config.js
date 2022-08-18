module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    PINO_KEY: process.env.PINO_KEY,
    PINO_TOKEN: process.env.PINO_TOKEN,
  },
};
