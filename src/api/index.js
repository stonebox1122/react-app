//  api列表
import { post } from './http';

// 1.2 用户注册
export const subRegistered = (params) => post('/jsmall/app/main/doRegisterVisitor', params)

// 1.3 发送验证码
export const sendCode = (params) => post('/jsmall/app/main/sendMessage', params)

// 1.4 账户密码登陆
export const loginByPwd = (params) => post('/jsmall/app/main/login', params)

// 1.5 短信快捷登陆
export const loginByCode = (params) => post('/jsmall/app/main/msglogin', params)
