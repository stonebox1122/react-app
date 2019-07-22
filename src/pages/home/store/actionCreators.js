// actionCreator 主要是为了格式化dispath
import * as types from './actionTypes'

// 子页面的展示隐藏
export const toggleComponent = () => {
  return {
    type: types.TOGGLE_SHOW_COM
  }
}

// 切换loading的展示隐藏
export const toggleLoading = () => {
  return {
    type: types.TOGGLE_SHOW_LOADING
  }
}
