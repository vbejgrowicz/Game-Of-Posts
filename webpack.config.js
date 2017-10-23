const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VENDOR_LIBS = ["react", "react-dom", "prop-types", "react-bootstrap", "react-redux", "react-router-bootstrap", "react-router-dom", "redux", "redux-thunk"];
const extractCSS = new ExtractTextPlugin('[name].[chunkhash].css');

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      title: 'Game Of Posts',
      filename: "index.html",
      template: "./public/index.html"
    })
  ]
};
