//  api列表
import { get, post } from './http';

// 1.1 编号加载名称
export const initPer = (params) => get('/jsmall/app/main/findUserTruename', params)

// 1.2 用户注册
export const subRegistered = (params) => post('/jsmall/app/main/doRegisterVisitor', params)

// 1.3 发送验证码
export const sendCode = (params) => post('/jsmall/app/main/sendMessage', params)

// 1.3.1 校验验证码
export const verficationCode = params => post('/jsmall/app/main/checkMessage', params)

// 1.4 账户密码登陆
export const loginByPwd = (params) => post('/jsmall/app/main/login', params)

// 1.5 短信快捷登陆
export const loginByCode = (params) => post('/jsmall/app/main/msglogin', params)

// 1.6.1 收货地址列表
export const getAddrList = (params) => get('/jsmall/app/main/myAddress', params)

// 1.6.3 新增收货地址（web）
export const addAddress = (params) => post('/jsmall/app/main/addAddressParam', params)

// 1.6.4 修改收货地址
export const editAddress = params => get('/jsmall/app/main/updateAddress', params)

// 1.6.4 删除收货地址
export const delAddress = params => get('/jsmall/app/main/removeAddress', params)

// 1.7 用户中心个人面板
export const loadMine = params => get('/jsmall/app/main/loadCenter', params)

// 1.7.2 更改个人资料
export const changeMineInfo = params => get('/jsmall/app/main/editUserInfo', params)

// 1.7.3 更改手机号
export const changePhoneNum = params => get('/jsmall/app/main/editMobile', params)

// 1.7.4 更改密码
export const changePwd = params => get('/jsmall/app/main/editPwd', params)

// 1.8.1 获取省市区（web）
export const getCitys = () => get('/jsmall/app/main/getAllArea')

// 2.1 加载首页
export const initHomePage = (params) => get('/jsmall/app/index/i', params)

// 2.2 加载能量塔、能量健康、优品区、精品区、能量课程列表
export const getList = params => get('/jsmall/app/index/ii', params)

// 2.3 加载视频（免费视频、精彩尝鲜、精品推荐）列表
export const getVideoList = params => get('/jsmall/app/index/iii', params)

// 2.4 加载所有商品列表
export const getAllGoodsList = params => get('/jsmall/app/index/all', params)

// 2.5 获取商品详情
export const getGoodsDetail = params => get('/jsmall/app/index/ginfo', params)

// 3.1 产品下单
export const setOrder = params => get('/jsmall/app/orders/placeOrder', params)

// 3.2 确认订单（预付单）
export const confirmOrder = params => get('/jsmall/app/orders/confirmTheOrder', params)

// 4.1 积分支付-购买产品
export const pointPay = params => post('/jsmall/app/pay/goPointPayBuyProduct', params)