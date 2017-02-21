var webpack = require('webpack');
var path = require('path');
var copy = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'index': './src/index.js',
    'background': './src/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].js.map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'raw'
    }]
  },
  devtool: 'source-map',
  plugins: [
    new copy([{
      from: 'static',
      to: '.'
    }]),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      sourceMap: true,
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      }
    })
  ]
}
