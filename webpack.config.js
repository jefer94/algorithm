const webpack        = require('webpack')
const path           = require('path')
const LodashPlugin   = require('lodash-webpack-plugin')
// const UglifyJsPlugin    = require('uglifyjs-webpack-plugin')
// const CompressionPlugin = require("compression-webpack-plugin")
require('dotenv').config()

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: 'assets/'
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'eval' : 'cheap-module-source-map',
  // mode: process.env.NODE_ENV,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: process.env.NODE_ENV !== 'production' ? /node_modules/ : undefined
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
    // new UglifyJsPlugin,
    new webpack.HotModuleReplacementPlugin,
    new webpack.optimize.AggressiveMergingPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
    /* new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })*/
  ]
};
