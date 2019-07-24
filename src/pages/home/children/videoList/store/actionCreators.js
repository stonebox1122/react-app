import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { getList } from '$src/api'

// 将数据添加到store
export const addList = (list) => {
  return {
    type: types.ADD_LIST,
    list
  }
}

// 数据请求的函数
export const getTowerList = (query) => {
  return (dispatch) => {
    getList(query).then(res => {
      if (res.code === '1') {
        // 保存数据 更新列表状态
        dispatch(addList(res.data.list))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}
