// actionCreator 主要是为了格式化dispath
import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { initHomePage } from '$src/api'
// 子页面的展示隐藏
export const toggleComponent = () => {
  return {
    type: types.TOGGLE_SHOW_COM
  }
}

// 保存首页请求数据
export const initHome = (action) => {
  return {
    type: types.INIT_HOME,
    data: action
  }
}

// 初始化首页(函数请求)
export const getHomeMsg = (query) => {
  return (dispatch) => {
    initHomePage(query).then(res => {
      if (res.code === '1') {
        dispatch(initHome(res.data))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}
