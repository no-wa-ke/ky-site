const path = require('path');
const webpack = require('webpack');
const riot = require('riot');
const sass = require('node-sass');
const getdir = require('path').dirname;
const autoprefixer = require('autoprefixer')
var fs  = require('fs');

//custom riot sass parser by yoji kido
riot.parsers.css['sass-prefix']= (tagName,css,opts,url)=>{
	var type = 'space'
	var spc = css.match(/^\s+/)
	if (spc) {
		css = css.replace(RegExp('^' + spc[0], 'gm'), '')
		if (/^\t/gm.test(css)) {
		type = 'tab'
		}

	}
	var defopts = {
		data:css,
		indentedSyntax:true,
		includePaths:[getdir(url)],
		indentType:type
	}

	var res = sass.renderSync(defopts).css+ ``
	var prefix = autoprefixer.process(res).css + ``

	return prefix
}

riot.parsers.css['prefix'] = (tagName,css,opts,url)=>{
	var defopts = {
		data:css,
	  indentedSyntax: false,
	  omitSourceMapUrl: true,
		includePaths:[getdir(url)],
	  outputStyle: 'compact'
}
	var res = sass.renderSync(defopts).css+ ``
	var prefix = autoprefixer.process(res).css + ``

	return prefix


}

const webpackConfig = {
	// cache: true,
	module: {},
	// devtool: 'inline-source-map'
  // devtool: 'eval',
}

webpackConfig.output = {
	filename: 'bundle.js'
}

webpackConfig.externals = {
		'riot': 'riot',
		'window.riot': 'riot',
		'window.$': 'jquery',
		'window.jquery': 'jquery',
		'window.jQuery': 'jquery',
		'window.route': 'riot-route',
		'window.detector': 'detector',
		// 'window.Snap': 'Snap',
		// 'window.semantic': 'semantic',
		// 'window.anime': 'anime',

}

webpackConfig.plugins = [
	new webpack.optimize.OccurrenceOrderPlugin(),

];

webpackConfig.module.preLoaders = [{
	test: /\.tag$/,
	exclude: /node_modules/,
	loader: 'riot-tag-loader',
	query: {
		template: 'pug',debug:'true' ,type:'none',
	},
}];

webpackConfig.module.loaders = [{
	test: /\.js$|\.tag$/,
	loader: 'babel-loader',
	exclude: /node_modules/,
	query: {
		presets: ['es2015','stage-0','stage-2'],
		plugins: ['external-helpers-2'],
	}
}];

module.exports = webpackConfig;
