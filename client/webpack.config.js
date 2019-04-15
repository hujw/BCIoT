var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true
  },
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
    rules: [
      /*{
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: path.join(__dirname, 'src/'),
        exclude: /node_modules/,
        options: {
          fix: true
        }
      },*/
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader',
        include: path.join(__dirname, 'src/')
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    /*
    new FaviconsWebpackPlugin({
        prefix: '/icon-[hash]/',
        logo: './src/assets/logo.png',
        template: 'src/index.ejs',
        inject: true,
    }),
    */
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: true
    })
  ]
}
