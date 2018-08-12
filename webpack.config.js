const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const babelenv = require('babel-preset-env');
const babelreact = require('babel-preset-react');
const babelcommonjs = require('babel-plugin-transform-es2015-modules-commonjs');
const babelstage0 = require('babel-preset-stage-0');
const path = require('path');

module.exports = {
    mode: 'development', // "production" | "development" | "none"
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    },
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    output: {
        filename: 'ereactgrid.js',
        path: path.resolve(__dirname, 'public', 'dist'),
        // export itself to a global var
        libraryTarget: 'var',
        // name of the global var: "Foo"
        library: 'EReactGrid'
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [babelenv, babelreact, babelstage0],
                        plugins: [babelcommonjs]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json']
    },
    target: 'node',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            global: {}, // bizarre lodash(?) webpack workaround
            'global.GENTLY': false // superagent client fix
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            uglifyOptions: {
                ecma: 5,
                ie8: true,
                safari10: true
            }
        })
    ]
};
