const webpack      = require('webpack')
const path         = require('path')
const LodashPlugin = require('lodash-webpack-plugin')
require('dotenv').config()

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: 'assets/'
  },
  devtool: 'eval',
  // mode: process.env.NODE_ENV,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      loader: 'image-webpack-loader!file-loader'
    },
    {
      test: /\.s(a|c)ss$/,
      loader: 'style-loader!css-loader!sass-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    contentBase: './',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  plugins: [
    new LodashPlugin,
    new webpack.optimize.UglifyJsPlugin,
    new webpack.HotModuleReplacementPlugin
  ]
};
