import * as types from './actionType'

// 子页面的显示隐藏
export const toggleComponent = () => {
  return {
    type: types.TOGGLE_SHOW_COM
  }
}

// 初始化购物车
export const initCart = (info) => {
  return {
    type: types.INIT_CART,
    info
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
    id: option.id
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