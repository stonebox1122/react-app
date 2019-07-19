//  api列表
import { post } from './http';

// 1.2 用户注册
export const subRegistered = (params) => post('/jsmall/app/main/doRegisterVisitor', params)

// 1.3 发送验证码
export const sendCode = (params) => post('/jsmall/app/main/sendMessage', params)

