const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'none',
  entry: {
    app: ['@babel/polyfill', './server/server.js']
  },
  output: {
    path: path.resolve(__dirname, 'server/dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }
    }]
  },
  devtool: 'eval-source-map',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()]
}