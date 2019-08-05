const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', 
      {
        "target": "http://192.168.0.106:8080",
        // "target": "http://192.168.0.100:8008",
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": ""
        }
      }
    )
  )
}
