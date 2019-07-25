import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { getAllGoodsList, getGoodsDetail } from '$src/api'

// 将数据添加到store
export const addList = (list) => {
  return {
    type: types.GET_GOODS,
    list
  }
}

// 保存商品详情
export const initDetail = (info) => {
  return {
    type: types.SAVE_DETAIL,
    info
  }
}

// 获取商品详情
export const getDetail = (query) => {
  return (dispatch) => {
    getGoodsDetail(query).then(res => {
      if (res.code === '1') {
        dispatch(initDetail(res.data))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

// 数据请求的函数-获取商品列表
export const getList = (query) => {
  return (dispatch) => {
    getAllGoodsList(query).then(res => {
      if (res.code === '1') {
        // 保存数据 更新列表状态
        dispatch(addList(res.data.list))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}
