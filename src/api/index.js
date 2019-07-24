//  api列表
import { get, post } from './http';

// 1.1 编号加载名称
export const initPer = (params) => get('/jsmall/app/main/findUserTruename', params)

// 1.2 用户注册
export const subRegistered = (params) => post('/jsmall/app/main/doRegisterVisitor', params)

// 1.3 发送验证码
export const sendCode = (params) => post('/jsmall/app/main/sendMessage', params)

// 1.4 账户密码登陆
export const loginByPwd = (params) => post('/jsmall/app/main/login', params)

// 1.5 短信快捷登陆
export const loginByCode = (params) => post('/jsmall/app/main/msglogin', params)

// 2.1 加载首页
export const initHomePage = (params) => get('/jsmall/app/index/i', params)

// 2.2 加载能量塔、能量健康、优品区、精品区、能量课程列表
export const getList = params => get('/jsmall/app/index/ii', params)

// 2.3 加载视频（免费视频、精彩尝鲜、精品推荐）列表
export const getVideoList = params => get('/jsmall/app/index/iii', params)

// 2.4 加载所有商品列表
export const getAllGoodsList = params => get('/jsmall/app/index/all', params)