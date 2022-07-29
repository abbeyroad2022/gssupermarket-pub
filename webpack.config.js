const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const sourcePath = './src/';
const outputPath = './dist/';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

function generateHtmlPlugins(htmlDir) {
	const htmlIndexFiles = fs.readdirSync(htmlDir).filter(file => file.substr(-5) === '.html');
	const htmlIndex = htmlIndexFiles.map(file =>
		new HtmlWebpackPlugin({
			// favicon: './favicon.ico',
			template: `./${file}`,
			filename: `${file}`,
			hash: false,
			inject: 'body',
			chunks: ['ui'],
		}),
	);
	// folderList Array에 html내 폴더명 추가
	const subList = ['showdeal', 'chundeal', 'shortcut', 'scrap', 'login', 'mypage', 'search', '_common'];
	for (i = 0; i < subList.length; i++) {
		const htmlSubFile = fs.readdirSync(`./src/html/${subList[i]}/`).filter(file => file.substr(-5) === '.html');
		const htmlSub = htmlSubFile.map(file => new HtmlWebpackPlugin({
			// favicon: './favicon.ico',
			template: `./html/${subList[i]}/${file}`,
			filename: `html/${subList[i]}/${file}`,
			hash: false,
			inject: 'body',
			chunks: ['ui'],
		}));
		htmlIndex.push(...htmlSub);
	}
	return htmlIndex;
}

module.exports = (env) => {
	// Webpack 플러그인
	const plugins = [
		// new CleanWebpackPlugin([outputPath]),
		new CopyWebpackPlugin([
			{
				from: './status/**/*',
				force: true,
			},
			{
				from: './assets/libs/**/*',
				force: true,
			},
			{
				from: './assets/fonts/**/*',
				force: true,
			},
			{
				from: './assets/img/**/*',
				force: true,
			},
			{
				from: './assets/data/**/*',
				force: true,
			},
			{
				from: './Src/assets/img/**',
				to: './assets/img',
				flatten: true
			},
			// {
			// 	from: './favicon.ico',
			// 	to: 'favicon.ico'
			// },
			// {
			// 	from: './facebook.jpg',
			// 	to: 'facebook.jpg',
			// },
		]),
		new ExtractTextPlugin('assets/css/style.css'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
	];

	// html의 개수에 따라 HtmlWebpackPlugin 생성
	const htmlList = generateHtmlPlugins(sourcePath);

	// HtmlWebpackPlugin 확장 플러그인
	const htmlPlugins = [
		new HtmlBeautifyPlugin({
			config: {
				html: {
					indent_size: 2,
					end_with_newline: true,
					preserve_newlines: true,
					unformatted: ['p', 'i', 'b', 'span'],
				},
			},
		}),
	];

	console.log(env.NODE_ENV);

	return {
		context: path.resolve(__dirname, sourcePath),
		entry: {
			ui: [
				'./assets/css/style.scss',
				'./assets/js/ui.js'
			],
		},
		output: {
			filename: 'assets/js/[name].js',
			path: path.resolve(__dirname, outputPath),
		},
		devServer: {
			open: true,
			contentBase: path.resolve(__dirname, outputPath),
			watchContentBase: true,
			inline: true,
			port: 9000,
			openPage: './_status/status.html',
		},
		devtool: env.NODE_ENV === 'development' ? 'source-map' : false,
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						use: [{
							loader: 'css-loader',
							// options: {
							//     minimize: env.NODE_ENV === 'production',
							// },
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								outputStyle: "compact", //nested, expanded, compact, compressed
							},
						}],
						fallback: 'style-loader',
						publicPath: '../../',
					}),
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					exclude: /node_modules/,
					loader: 'url-loader',
					options: {
						// name: env.NODE_ENV === 'development' ? '[name].[ext]' : '[name].[ext]?[hash]',
						// outputPath: `./img/`,
						name: env.NODE_ENV === 'development' ? '[path][name].[ext]' : '[path][name].[ext]',
						limit: 1000,
					},
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								//name: 'assets/fonts/[name].[hash:8].[ext]',
								name: 'assets/fonts/[name].[ext]',
							},
						},
					],
				},
				/*{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				},*/
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					options: {
						presets: [
							'babel-preset-env'
						],
					},
				},
			],
		},
		plugins: plugins.concat(htmlList).concat(htmlPlugins),
	};
};
