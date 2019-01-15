const path = require('path');
let NODE_MODULES_DIR = /node_modules/;
let webpackConfig = {
	mode: 'development',
	entry: {
		index: [
			'./index.ts'
		],
		lodash: [
			path.join(__dirname, 'src', 'libs', 'lodash.js'),
		],
		platform: [
			path.join(__dirname, 'src', 'libs', 'platform.js'),
		]
	},
	output: {
		filename: '[name].js'
	},
	devServer: {
		clientLogLevel: 'none',
		disableHostCheck: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				use: 'ts-loader',
				exclude: NODE_MODULES_DIR
			},
			{
				test: /\.(jsx|js)?$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'src'),
					path.resolve(__dirname, 'src', 'libs'),
				]
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
};



module.exports = webpackConfig;