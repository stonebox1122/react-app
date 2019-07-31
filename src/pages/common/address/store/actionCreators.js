import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { getAddrList, addAddress, editAddress, delAddress, getCitys } from '$src/api'


// 添加新地址
export const addNewAddress = (query,cb) => {
  return dispatch => {
    addAddress(query).then(res => {
      if (res.code === '1') {
        cb()
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

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

// 获取省市区
export const getCityList = () => {
  return dispatch => {
    getCitys().then(res => {
      if (res.code === '1') {
        dispatch(cityList(res.data.areas))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

// 保存省市区
export const cityList = (list) => {
  return {
    type: types.CITY_LIST,
    list
  }
}

// 保存地址列表
export const saveList = (list) => {
  return {
    type: types.SAVE_ADDR_LIST,
    list
  }
}

// 改变当前选中地址
export const changeCurrentAddr = (info) => {
  return {
    type: types.CHANGE_CURRENT_ADDR,
    info
  }
}

// export const saveNewAddr = (addr) => {
//   return {
//     type: types.SAVE_NEW_ADDR,
//     addr
//   }
// }