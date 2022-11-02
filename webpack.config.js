var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/preloader/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cookiesjsr-preloader.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-classes']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};
