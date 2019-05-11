const path = require('path');
// 应该是用于将打包好的js插到网页的
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 将css文件抽离单独打包成css而不是打包进js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 打包前清空
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	// 入口 
	entry: {
		app: [
      "@babel/polyfill",
			path.join(__dirname, '../src/index.js')
		],
		// 公共代码提取1
		vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js', // 公共代码提取2
    publicPath: '/'
	},
	/* src目录下面的以.js结尾的文件, 要使用babel 进行解析*/
	/*cacheDirectory是用来缓存编译结果，下次编译加速*/
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader?cacheDirectory=true'],
				include: path.join(__dirname, '../src')
			},
			{
				test: /\.css$/,
				use: [
					{
						// css单独抽离压缩
						loader: MiniCssExtractPlugin.loader
					},
					{
					loader: 'css-loader',
					options: {
						// 开启 CSS Modules
						modules: true,
						// 自定义生成的类名
						localIdentName: '[local]_[hash:base64:8]'
					}
				}, 'postcss-loader']
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8291 // 小于8k的转为base64编码
					}
				}]
			}
		]
	},
	// devtool优化 打断点看
	devtool: 'none',
	// 文件路径映射
	resolve: {
		alias: {
			'@': path.join(__dirname, '../src/components'),
			'~': path.join(__dirname, '../src/pages')
		}
  },
  // 公共块提取
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
	plugins: [
		// 将编译后的js自动注入
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, '../public/index.html')
		}),
		// 抽离css
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename:"[id].[contenthash].css"
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin(),
    // 打包前清空
    new CleanWebpackPlugin()
	]
}