import * as types from './actionType'
import * as commonActionCreators from '~/common/store/actionCreators'
import * as addressActionCreators from '~/common/address/store/actionCreators'
import { setOrder } from '$src/api'
// 子页面的显示隐藏
export const toggleComponent = () => {
  return {
    type: types.TOGGLE_SHOW_COM
  }
}

// 初始化购物车
export const initCart = (list, selectAll) => {
  return {
    type: types.INIT_CART,
    list,
    selectAll
  }
}

// 选中/取消选中
export const toggleSelect = (option) => {
  return {
    type: types.TOGGLE_SELECT,
    id: option.gid,
    valueid: option.valueid
  }
}

// 全选/取消全选
export const toggleSelectAll = () => {
  return {
    type: types.TOGGLE_SELECT_ALL
  }
}

// 更改数量
export const changeNum = (option) => {
  return {
    type: types.CHANGE_NUM,
    way: option.way,
    id: option.id,
    valueid: option.valueid
  }
}

// 加入购物车
export const addCart = (query) => {
  return {
    type: types.ADD_CART,
    query
  }
}

// 删除
export const del = (query) => {
  return {
    type:types.DEL,
    query
  }
}

// 将初始化的order存进redux
export const initOrder = (order) => {
  return {
    type: types.INIT_ORDER,
    order
  }
}


// getorder
export const getOrder = (query) => {
  return (dispatch) => {
    setOrder(query).then(res => {
      if (res.code === '1'){
        dispatch(initOrder(res.data))
        dispatch(addressActionCreators.changeCurrentAddr(res.data.isdefault_address))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}