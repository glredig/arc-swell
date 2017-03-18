var webpack = require('webpack');
var path	= require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
	context: __dirname,
	entry: __dirname + '/src/js/entry.js',
	output: {
		path: __dirname + '/dist',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false // https://github.com/webpack/webpack/issues/1496
	      }
	    }),

	    new ExtractTextPlugin('arc-swell.css')
	],
	resolve: {
		modules: [
			path.resolve(__dirname, './src/js'),
			'node_modules'
		],
		alias: {
			Swell: path.resolve('./src/js/Swell.js')
		}
	}
}

module.exports = config;