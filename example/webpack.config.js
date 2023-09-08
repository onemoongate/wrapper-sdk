const path = require('path');

module.exports = {
  // Assuming the entry point of your application is 'src/index.js'
  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    // Handle the polyfill errors
    fallback: {
      "fs": false,          // Assumes you don't need fs in the browser
      "net": false,         // Assumes you don't need net in the browser
      "tls": false,         // Assumes you don't need tls in the browser
      "tty": false,         // Assumes you don't need tty in the browser
      "path": require.resolve("path-browserify")  // Path polyfill
    }
  },

  // Assuming you want to use the webpack-dev-server for development
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    hot: true,
  },
