import wx from 'weixin-js-sdk'

// 微信公众号支付
export const wxGZHpay =  (msg, cb) => {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
    // 参数信息会通过log打出，仅在pc端时才会打印。
    appId: msg.appId, // 必填，公众号的唯一标识
    timestamp: msg.timeStamp, // 必填，生成签名的时间戳
    nonceStr: msg.nonceStr, // 必填，生成签名的随机串
    signature: 'MD5', // 必填，签名，见附录1
    jsApiList: [
      'chooseWXPay'// 微信支付
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.chooseWXPay({
    timestamp: msg.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: msg.nonceStr, // 支付签名随机串，不长于 32 位
    package: msg.package,
    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    paySign: msg.sign, // 支付签名
    success: function (res) {
      // 支付成功后的回调函数
      if (res.errMsg === 'chooseWXPay:ok') {
        // 支付成功
        /*eslint-disable */
        cb('success')
      } else {
        cb(res.errMsg)
      }
    },
    cancel: function (res) {
      // 支付取消
      cb('支付取消')
    }
  })
}
 