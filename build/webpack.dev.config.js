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
	}
}