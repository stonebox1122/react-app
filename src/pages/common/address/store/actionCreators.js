import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { getAddrList, addAddress, editAddress, delAddress } from '$src/api'


// 获取地址列表
export const getList = (query) => {
  return dispatch => {
    getAddrList(query).then(res => {
      if (res.code === '1') {
        dispatch(saveList(res.data))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

export const saveList = (list) => {
  return {
    type: types.SAVE_ADDR_LIST,
    list
  }
}