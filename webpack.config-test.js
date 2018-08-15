var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
