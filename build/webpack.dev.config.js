const path = require('path');
// 应该是用于将打包好的js插到网页的
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: 'development',
	// 入口 
	entry: path.join(__dirname, '../src/index.js'),
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'bundle.js'
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
				use: ['style-loader', {
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
	// 配置热更新
	devServer: {
		// contentBase: path.join(__dirname, '../dist'),
		compress: true, // gzip压缩
		host: 'localhost',  // 允许ip访问
		hot: true, // 热更新
		historyApiFallback: true, // 解决启动后刷新404
		port: 8899, // 端口
		proxy: {
			'/api': {
				target: '192.168.0.106:8080',
				pathRewrite: {'^/api': ''},
				changeOrigin: true
			}
		}
	},
	// devtool优化 打断点看
	devtool: 'inline-source-map',
	// 文件路径映射
	resolve: {
		alias: {
			'@': path.join(__dirname, '../src/components'),
			'~': path.join(__dirname, '../src/pages')
		}
	},
	plugins: [
		// 将编译后的js自动注入
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, '../public/index.html')
		})
	]
}