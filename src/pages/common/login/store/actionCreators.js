// actionCreator 主要是为了格式化dispath
import * as types from './actionTypes'
import { fromJS } from 'immutable'
import { subRegistered } from '$src/api';

// 登陆 -- 获取数据
export const registered = (form) => {
  return (dispatch) => {
    subRegistered(form).then(res => {
      if (res.code === '1') {
        dispatch(setInfo(res.data)) // 调用下面保存
      } else {
        dispatch(toggleModal(res.msg))
      }
    })
  }
}

// 显示隐藏弹框
export const toggleModal = (msg) => {
  return {
    type: types.TOGGLE_MODAL,
    msg: msg
  }
}

// 存储登陆的uid和token
export const setInfo = (info) => {
  return {
    type: types.SET_INFO,
    info: fromJS(info)
  }
}