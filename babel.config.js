
/**
	@babel/core 调用Babel的API进行转码
	@babel/preset-env 用于解析 ES6
	@babel/preset-react 用于解析 JSX
	babel-loader 加载器
*/
const babelConfig = {
	presets: ["@babel/preset-env", "@babel/preset-react"],
	plugins: []
}

module.exports = babelConfig;