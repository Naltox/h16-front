"use strict";
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');
let webpack = require('webpack');

const NODE_ENV = 'production';
const BUILD_DIR = 'public/';

const v = (new Date()).getTime()

const styleLoaders = [
    'css-loader?minimize!',
    'autoprefixer-loader?browsers=last 2 versions',
    'sass-loader'
]

const config = {
    entry: {
        app: "./src/app.js",
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'redux'
        ]
    },

    output: {
        path: path.join(__dirname, BUILD_DIR),
        filename:  "[name]."+v+".js"
    },

    module : {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-runtime', 'add-module-exports', 'transform-decorators-legacy']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]", "autoprefixer-loader?browsers=last 2 versions", "sass-loader"]
            },
            {
                test: /\.(ttf|woff|eot)$/,
                loader: 'file-loader'
            },
            { test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=4000' }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: "",
            template: './src/index.ejs',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(NODE_ENV == 'production'),
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin("[name]."+v+".css")
    ]
}

if (NODE_ENV == 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        mangle: {
            keep_fnames: true,
            toplevel: true
        }
    }))
    config.plugins.push(new webpack.optimize.DedupePlugin())
}

module.exports = config