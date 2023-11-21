const path = require('path');
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Исправление для fs модуля
      config.resolve.fallback.fs = false;
    }

    // Настройка алиаса
    config.resolve.alias['@fonts'] = path.join(__dirname, '../shared/fonts');

    return config;
  },
};
