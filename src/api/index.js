//  api列表
import { get, post } from './http';

// 1.1 编号加载名称
export const initPer = (params) => get('/app/main/findUserTruename', params)

// 1.2 用户注册
export const subRegistered = (params) => post('/app/main/doRegisterVisitor', params)

// 1.3 发送验证码
export const sendCode = (params) => post('/app/main/sendMessage', params)

// 1.3.1 校验验证码
export const verficationCode = params => post('/app/main/checkMessage', params)

// 1.4 账户密码登陆
export const loginByPwd = (params) => post('/app/main/login', params)

// 1.5 短信快捷登陆
export const loginByCode = (params) => post('/app/main/msglogin', params)

// 1.5.3 WEB第三方账户登录（微信）
export const wxLogin = params => post('/app/main/threeLoginByCode', params)

// 1.5.4 第三方绑定用户（微信、qq、新浪）
export const bindwx = param => post('/app/main/threeBindMobile', param)

// 1.6.1 收货地址列表
export const getAddrList = (params) => get('/app/main/myAddress', params)

// 1.6.3 新增收货地址（web）
export const addAddress = (params) => post('/app/main/addAddressParam', params)

// 1.6.4 修改收货地址
export const editAddress = params => get('/app/main/updateAddress', params)

// 1.6.4 删除收货地址
export const delAddress = params => get('/app/main/removeAddress', params)

// 1.7 用户中心个人面板
export const loadMine = params => get('/app/main/loadCenter', params)

// 1.7.2 更改个人资料
export const changeMineInfo = params => get('/app/main/editUserInfo', params)

// 1.7.3 更改手机号
export const changePhoneNum = params => get('/app/main/editMobile', params)

// 1.7.4 更改密码
export const changePwd = params => get('/app/main/editPwd', params)

// 1.8.1 获取省市区（web）
export const getCitys = () => get('/app/main/getAllArea')

// 1.9 加载是否响应会员申请
export const initApplicetionVip = params => get('/app/main/loadOpenMData', params)

// 1.10 提交会员申请
export const subApplicetionVip = params => get('/app/main/submitOpenMData', params)

// 1.11 查看服务网点（分页）
export const getServerNodes = params => get('/app/main/showNets', params)

// 1.12 分享二维码
export const getQr = params => post('/app/main/userShare', params)

// 2.1 加载首页
export const initHomePage = (params) => get('/app/index/i', params)

// 2.2 加载能量塔、能量健康、优品区、精品区、能量课程列表
export const getList = params => get('/app/index/ii', params)

// 2.3 加载视频（免费视频、精彩尝鲜、精品推荐）列表
export const getVideoList = params => get('/app/index/iii', params)

// 2.4 加载所有商品列表
export const getAllGoodsList = params => get('/app/index/all', params)

// 2.5 获取商品详情
export const getGoodsDetail = params => get('/app/index/ginfo', params)

// 3.1 产品下单
export const setOrder = params => get('/app/orders/placeOrder', params)

// 3.2 确认订单（预付单）
export const confirmOrder = params => get('/app/orders/confirmTheOrder', params)

// 3.3 获取订单详情
export const getOrderDetail = params => get('/app/orders/findOrderInfo', params)

// 3.4 获取我的订单列表
export const getOrderList = params => get('/app/orders/myOrders', params)

// 4.1 积分支付-购买产品
export const pointPay = params => post('/app/pay/goPointPayBuyProduct', params)

// 4.2 微信支付-购买产品（拉起支付，含app、h5）
export const getwxSign = param => post('/app/pay/goWechatBuyProduct', param)

// 4.3.1 微信支付-充值（拉起支付，含app、h5）
export const wxEncharge = parame => post('/app/pay/wechatRecharge', parame)

// 4.3.2 充值记录（带分页）
export const enchargeList = params => get('/app/pay/getRechargeLog', params)

// 4.4.1 提现前准备数据
export const initWithdraw = params => post('/app/pay/cashesUsingData', params)

// 4.4.2 提现-银联（申请提现，线下环境）
export const withdraw = params => post('/app/pay/cashesUnionPay', params)

// 4.4.3 提现记录（带分页）
export const withdrawList = params => post('/app/pay/getCashesLog', params)

// 4.5.1 转给自己
export const transferSelf = param => post('/app/pay/accountTransfer_from1_to1', param)

// 4.5.2 根据对方编号获取姓名及头像
export const getFriendInfo = param => post('/app/pay/accountTransfer_from1_to2_go', param)

// 4.5.3 转给对方
export const tranferTofriend = param => post('/app/pay/accountTransfer_from1_to2_do', param)

// 4.5.4 转账记录（带分页）
export const getTransList = param => post('/app/pay/transfer_log', param)

// 4.7 微信获取openid-公众平台
export const getOpenid = params => post('/app/pay/getWeChatOpenId',params)

// 5.1 已购买视频列表（带分页）
export const buyedViodeList = params => get('/app/video/myVideos', params)

// 5.2 视频套装详情（游客可访问）
export const getVideo = params => get('/app/video/info', params)

// 5.3 点赞/取消赞（游客不可访问）
export const toggleZan  = params => post('/app/video/isLike', params)