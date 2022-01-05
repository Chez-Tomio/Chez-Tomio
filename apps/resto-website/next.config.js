const withOptimizedImages = require('next-optimized-images');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
const globalConfig = require('./config/global');
const pagesConfig = require('./config/pages');

module.exports = withOptimizedImages({
    optimizeImagesInDev: true,
    publicRuntimeConfig: {
        globalConfig,
        pagesConfig,
    },
    i18n,
    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
});
