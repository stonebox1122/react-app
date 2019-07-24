import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { getVideoList } from '$src/api'

// 将数据添加到store
export const addList = (list, flag) => {
  return {
    type: types.ADD_LIST,
    list,
    flag
  }
}

// 数据请求的函数
export const getList = (query) => {
  return (dispatch) => {
    getVideoList(query).then(res => {
      if (res.code === '1') {
        // 保存数据 更新列表状态
        dispatch(addList(res.data.list, query.type))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}
