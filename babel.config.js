
/**
	@babel/core 调用Babel的API进行转码
	@babel/preset-env 用于解析 ES6
	@babel/preset-react 用于解析 JSX
	babel-loader 加载器
*/
const babelConfig = {
	presets: [["@babel/preset-env", 
	{
		useBuiltIns: "entry",
		corejs: 2
	}]
	,"@babel/preset-react"],
	plugins: ["@babel/plugin-syntax-dynamic-import",'@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties'] //动态导入
}

module.exports = babelConfig;