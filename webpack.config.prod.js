var path = require('path')
	  , webpack = require('webpack')
	  , HtmlWebpackPlugin = require('html-webpack-plugin')
    , ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, './public');

module.exports = {
  entry: path.join(__dirname, 'app/main'),
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
	  new webpack.DefinePlugin({
	    'process.env': {
	      'NODE_ENV': JSON.stringify('production')
	    }
	  }),
	  new webpack.optimize.UglifyJsPlugin({
	    compressor: {
	      warnings: false
	    }
	  }),
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
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    },
    {
      test: /\.(png)$/, 
      loader: 'url-loader?limit=100000'
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
