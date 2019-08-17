let baseUrl

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseUrl = '/api/jsmall'
  // baseUrl = 'http://api.hzmjkw.cn'
} else {
  baseUrl = 'http://api.hzmjkw.cn'
}

export {
  baseUrl
}
