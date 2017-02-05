const path = require('path');
const webpack = require('webpack');



const webpackConfig = {
	cache: true,
	module: {},
  devtool: 'eval',
}

webpackConfig.output = {
	filename: 'bundle.js'
}


webpackConfig.plugins = [

	new webpack.ProvidePlugin({
		riot: 'riot',
		semantic: 'semantic',

	}),
	
];

webpackConfig.module.preLoaders = [{
	test: /\.tag$/,
	exclude: /node_modules/,
	loader: 'riotjs-loader',
	query: {
		template: 'pug'
	},
}];

webpackConfig.module.loaders = [{
	test: /\.js$|\.tag$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query: {
		presets: ['es2015-riot']
	}
}];

module.exports = webpackConfig;
