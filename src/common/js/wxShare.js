import { gethlSignature } from '$src/api'
import wx from 'weixin-js-sdk'

export const wxshare = msg => {
  let formDate = {
    url: window.location.href.split('#')[0]
  }
  gethlSignature(formDate).then((response) => {
    if (response.code === '1') {
      // 通过config接口注入权限验证配置
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，
        // 参数信息会通过log打出，仅在pc端时才会打印。
        appId: response.data.appId, // 必填，公众号的唯一标识
        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
        signature: response.data.signature, // 必填，签名，见附录1
        jsApiList: [
          'chooseWXPay', // 微信支付
          // 'checkJsApi',// 判断当前版本是否支持分享指定JS接口
          'onMenuShareTimeline', // 分享到朋友圈
          'onMenuShareAppMessage', // 分享到微信好友
          'onMenuShareQQ', // 分享到QQ
          'onMenuShareWeibo', // 分享到微博
          'onMenuShareQZone'// 分享到空间
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      /*eslint-disable */
      let share_config = {
        'share': {
          'imgUrl': msg.imgUrl, // 分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
          'desc': msg.desc, // 摘要,如果分享到朋友圈的话，不显示摘要。
          'title': msg.title, // 分享卡片标题
          'link': msg.link, // 分享出去后的链接，这里可以将链接设置为另一个页面。
          'success': function () { // 分享成功后的回调函数
          },
          'cancel': function () {
            // 用户取消分享后执行的回调函数
          }
        }
      }
      // 点击修改要分享的内容
      wx.ready(function () {
        wx.onMenuShareAppMessage(share_config.share) // 分享给好友
        wx.onMenuShareTimeline(share_config.share) // 分享到朋友圈
        wx.onMenuShareQQ(share_config.share) // 分享到QQ
        wx.onMenuShareWeibo(share_config.share) // 分享到腾讯微博
        wx.onMenuShareQZone(share_config.share) // 分享到空间
      })

      wx.error(function (res) {
        // alert(res.errMsg);  //打印错误消息。及把 debug:false,设置为debug:ture就可以直接在网页上看到弹出的错误提示
      })
    } else {
      console.log(response.errmsg)
    }
  }).catch((rej) => {
    console.log(rej)
  })
}
