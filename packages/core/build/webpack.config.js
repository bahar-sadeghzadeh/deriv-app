const path = require('path');
const { ALIASES, IS_RELEASE, MINIMIZERS, plugins, rules } = require('./constants');
const { openChromeBasedOnPlatform } = require('./helpers');

module.exports = function(env, argv) {
    console.log(`Building application for ${env.is_crypto_app === 'true' ? 'Deriv Crypto' : 'Deriv App'}...`);
    const base = env && env.base && env.base !== true ? '/' + env.base + '/' : '/';
    const sub_path = env && env.open && env.open !== true ? env.open : '';

    return {
        context: path.resolve(__dirname, '../src'),
        devServer: {
            open: openChromeBasedOnPlatform(process.platform),
            openPage: sub_path,
            host: 'localhost.binary.sx',
            https: true,
            port: 443,
            historyApiFallback: true,
            stats: {
                colors: true,
            },
        },
        devtool: IS_RELEASE ? 'source-map' : 'cheap-module-eval-source-map',
        entry: './index.js',
        mode: IS_RELEASE ? 'production' : 'development',
        module: {
            rules: rules(),
        },
        resolve: {
            alias: ALIASES,
            extensions: ['.js', '.jsx'],
        },
        optimization: {
            namedChunks: true,
            minimize: IS_RELEASE,
            minimizer: MINIMIZERS,
            splitChunks: {
                chunks: 'all',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                automaticNameMaxLength: 30,
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        output: {
            filename: 'js/core.[name].[contenthash].js',
            publicPath: base,
        },
        plugins: plugins({
            base,
            is_test_env: false,
            env,
        }),
    };
};
