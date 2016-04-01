'use strict';

var path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin')
    ;

console.log("path", path.join(__dirname, 'app/main'));

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'app/main')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    postLoaders: [
      { 
        exclude: /\.html$/,
        loader: "transform?brfs" 
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.(png)$/, 
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.svg$/, 
      loader: 'svg-url-loader'
    },
    {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, 
      loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract (
        'style-loader',
        'css-loader'
        )
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract (
        'style-loader',
        'css-loader!sass-loader'
        )
    }]
  }
};
