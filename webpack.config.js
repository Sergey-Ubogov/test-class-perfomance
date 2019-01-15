const path = require('path');
let NODE_MODULES_DIR = /node_modules/;
let webpackConfig = {
	mode: 'production',
	entry: './index.ts',
	output: {
		filename: 'index.js'
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
				],
				options: {
					babelrc: true,
				},
			},
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js']
	},
};



module.exports = webpackConfig;