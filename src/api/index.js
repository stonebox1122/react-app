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
