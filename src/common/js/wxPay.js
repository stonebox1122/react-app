import wx from 'weixin-js-sdk'

// 微信公众号支付
export const wxpay =  (msg, cb) => {
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
      cb('cancle')
    }
  })
}
 