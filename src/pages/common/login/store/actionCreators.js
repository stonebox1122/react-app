// actionCreator 主要是为了格式化dispath
import * as types from './actionTypes'
// import { fromJS } from 'immutable'

// 存储登陆的uid和token
export const setInfo = (info) => {
  let {uid,token, islogin} = info
  return {
    type: types.SET_INFO,
    uid,
    token,
    islogin
  }
}

export const exit = info => {
  // 这里是否要提交清空个人信息和购物车？
  return {
    type: types.EXIT
  }
}