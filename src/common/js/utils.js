// 保留两位小数
export const toFixed2 = (num) => {
  let number = parseFloat(num);
  if (typeof number !== 'number') {
    return num
  } else {
    number = number.toFixed(2)
  }
  return number
}

// 将数组转成字符串并编码
export const formatArr = (arr) => {
  return encodeURI(JSON.stringify(arr))
}

/**
 * 手机号的正则判断
 */
export const testPhoneNum = num => {
  let numReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|(199))\d{8}$/
  if (numReg.test(num)) {
    return true
  } else {
    return false
  }
}

/**
 * 存入localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}


export const getUA = () => {
  // 判断浏览器并存存储到state
  let ua = navigator.userAgent.toLowerCase()

  /*eslint-disable */
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return 'wechat'
  } else if (ua.match(/WeiBo/i) == 'weibo') {
    return 'weibo'
  } else if (ua.match(/QQ/i) == 'qq') {
    return 'qq'
  } else {
    return 'other'
  }
}

//截取URL后面传来的参数
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null) {
      return  decodeURI(r[2]);
  } else {
      return null;
  }
}

const url = encodeURI('http://js.qiankaiwangluo.com/wxAuthorize')
// 这个直接get访问重定向到接口会有跨域错误,还是要实验自己获取code
const defaultUrl = encodeURI('http://js.qiankaiwangluo.com/tab/home')
// const defaultUrl = encodeURI('http://localhost:8888/tab/home')

const gzAppid = 'wxea4f14282fec2754'
const kfAppid = ''
/**
 * 微信公众号静默授权登陆
 * @param {url} 重定向地址
 */

export const wechatLogingzhDefault = name => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gzAppid}&redirect_uri=${defaultUrl}?type=wechat&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
}

/**
 * 微信公众号登陆-点击授权
 */
export const wechatLogingzh = name => {
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${gzAppid}&redirect_uri=${url}?type=wechat&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

/**
  * 微信开放平台登陆
  */
export const wechatLoginOpen = name => {
  window.location.href = `https://open.weixin.qq.com/connect/qrconnect?appid=${kfAppid}&redirect_uri=${url}?type=wechatopen&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`
}

/**
 * QQ登陆
 */
export const qqLogin = name => {
  window.location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101446484&redirect_uri=${url}?type=qq`
}
