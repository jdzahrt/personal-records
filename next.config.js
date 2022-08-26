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
  webpack: (config) => {
    // this will override the experiments
    // eslint-disable-next-line no-param-reassign
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
};
