'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV
const BUILD_DIR = 'public'
const APP_DIR = 'src'

module.exports = {
    entry: {
        app: "./src/app.js"
    },

    output: {
        path: path.join(__dirname, BUILD_DIR),
        filename:  (NODE_ENV == 'production' ? "[name].[hash].js" : "[name].js?[hash]")
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
                test: /\.(png|jpg|svg|ttf|woff|eot)$/,
                loader: 'file-loader'
            }
        ]
    },

    devtool: (NODE_ENV != 'production' ? "inline-source-map" : null),

    plugins: [
        new webpack.NoErrorsPlugin(),
        new CleanWebpackPlugin(['public'], {
            root: __dirname,
            verbose: true,

            dry: false
            // exclude: ['shared.js']
        }),
        new HtmlWebpackPlugin({
            title: "",
            template: './src/index.ejs'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(NODE_ENV == 'production')
        })
    ],

    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7000',
                host: '127.0.0.1',
                secure: false,
                onProxyReq: function (proxyReq, req, res) {
                    proxyReq.setHeader('host', '127.0.0.1:7000')
                },
                pathRewrite: {'^/api' : ''}
            },
            '/app': {
                target: 'https://dev.vkforms.ru/',
                secure: false,
                pathRewrite: {'^/app' : ''}
            },
            '/mobile': {
                target: 'https://dev.vkforms.ru/',
                secure: false,
                pathRewrite: {'^/mobile' : ''}
            },
            '/serv': {
                target: 'ws://0.0.0.0:8081',
                secure: false,
                ws: true
                //pathRewrite: {'^/serv' : ''}
            }
        }
    }
}