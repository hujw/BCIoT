'use strict'
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    entry: {
        bundle: [
            path.resolve(__dirname, 'src/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[id].[chunkhash].js',
        publicPath: require('./config.js').publicPath
    },
    devtool: false,
    stats: {
        colors: true,
        reasons: false,
        progress: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'src': path.join(__dirname, './src'),
            'containers': path.join(__dirname, './src/js/containers'),
            'js': path.join(__dirname, './src/js'),
            'assets': path.join(__dirname, './src/assets')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                include: path.join(__dirname, 'src/')
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'stylus-loader']
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(ttf|eot|png|gif|jpg|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=8192'
            },
            {
                test: /\.(html)$/,
                use: 'file-loader?name=[path][name].[ext]&context=./src'
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
        }),
        new ExtractTextPlugin({
            filename: 'styles.[hash].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                properties: true,
                sequences: true,
                dead_code: true,
                drop_console: true,
                conditionals: true,
                comparisons: true,
                evaluate: true,
                booleans: true,
                unused: true,
                loops: true,
                hoist_funs: true,
                cascade: true,
                if_return: true,
                join_vars: true,
                drop_debugger: true,
                unsafe: true,
                hoist_vars: true,
                negate_iife: true
            },
            comments: false,
            mangle: true,
            minimize: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        /*
        new FaviconsWebpackPlugin({
            prefix: '/icons-[hash]/',
            template: 'src/index.ejs',
            logo: './src/assets/logo.png',
            inject: true
        }),
        */
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                collapseInlineTagWhitspace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
    ]
}
