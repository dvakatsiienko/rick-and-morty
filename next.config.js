/* eslint-env node */

const analyze = require('@next/bundle-analyzer');

const withBundleAnalyzer = analyze({
    enabled: process.env.ANALYZE === 'true',
    defaultSizes: 'gzip',
});

const nextConfig = {
    images: {
        domains: ['rickandmortyapi.com'],
    },
};

module.exports = withBundleAnalyzer(nextConfig);
