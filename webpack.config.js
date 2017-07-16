var poststylus = require('poststylus')

module.exports = {
  // JavaScript entry point
  entry: './app.js',

  // JavaScrip bundle file
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  // Setup server
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    // JS, JSX and SASS loaders
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.html$/,
        loader: 'html',
        exclude: /node_modules/
      },
     {
       test: /\.css$/,
       loader: 'style!css!postcss',
       exclude: /node_modules/ },
     {
       test: /\.styl$/,
       loader: 'style!css!stylus',
       exclude: /node_modules/
     }
    ]
  }
};
