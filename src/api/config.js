let baseUrl

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseUrl = '/api'
} else {
  baseUrl = 'http://api.xxxx'
}

export {
  baseUrl
}
