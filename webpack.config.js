const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const buildConfig = require('./webpack.config.build');
const devConfig = require('./webpack.config.dev');

const config = process.env.NODE_ENV === 'production' ? buildConfig : devConfig;

const baseConfig = {
	entry: './src/app.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'gmd.js',
		libraryTarget: 'umd',
		library: 'GMD',
		libraryExport: 'default'
	},

	target: 'web',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: ['babel-loader', 'eslint-loader']
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader','sass-loader']
			},
			{
				test: /\.(ttf|otf|eot|svg|woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
				loader: 'file-loader',
				query: {
					name: 'fonts/[name].[hash:8].[ext]'
				}
			},
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'gmd.css'
		}),
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.ejs'),
			title: 'Gábor Molnár - a dev guy from Hungary',
			description: 'Hello, I am Gábor Molnár. Full-stack developer from Hungary.',
		}),
		new CopyWebpackPlugin([
			{ from: path.resolve(__dirname, 'src/favicons'), to: path.resolve(__dirname, 'dist/favicons') },
			{ from: path.resolve(__dirname, 'src/robots.txt'), to: path.resolve(__dirname, 'dist/robots.txt') },
		]),
	]
};

module.exports = merge(baseConfig, config);