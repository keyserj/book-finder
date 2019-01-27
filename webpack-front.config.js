const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: {
    app: ['@babel/polyfill', './client/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'app.bundle.js'
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
}