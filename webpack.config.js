const webpack = require('webpack')
const path    = require('path')
require('dotenv').config()

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './dist/'
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
    // noInfo: false,
    // hot: true,
    inline: true
  },
};
