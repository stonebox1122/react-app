const path = require('path');
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
	    rules: [{
	        test: /\.js$/,
	        use: ['babel-loader?cacheDirectory=true'],
	        include: path.join(__dirname, '../src')
	    }]
	},
	// 配置热更新
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		compress: true, // gzip压缩
		host: 'localhost',  // 允许ip访问
		hot: true, // 热更新
		historyApiFallback: true, // 解决启动后刷新404
		port: 8899 // 端口
	}
}