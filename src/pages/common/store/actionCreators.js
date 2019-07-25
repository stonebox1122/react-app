// actionCreator 主要是为了格式化dispath
import * as types from './actionTypes'

// 切换loading的展示隐藏
export const toggleLoading = () => {
  return {
    type: types.TOGGLE_SHOW_LOADING
  }
}

// 显示隐藏弹框
export const toggleModal = (msg, title) => {
  return {
    type: types.TOGGLE_MODAL,
    msg, 
    title
  }
}