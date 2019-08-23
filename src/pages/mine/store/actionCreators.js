import * as commonActionCreators from '~/common/store/actionCreators'
import * as types from './actionTypes'
import {loadMine, changeMineInfo, transferSelf} from '$src/api'

// 3. 转账给自己 
export const transferToSelf = query => {
  return dispatch => {
    transferSelf(query).then(res => {
      if (res.code === '1') {
        // 转账成功.修改mine中的purse
        if (query.tel === 'fxlr2gwjf') {
          dispatch(changeShare(query.price_d, 'decrease'))
          dispatch(changeShoppoint(query.price_d, 'increase'))
        }
        dispatch(commonActionCreators.toggleModal('转账成功'))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

//2 改变信息
export const changeMine = (query) => {
  return dispatch => {
    changeMineInfo(query).then(res => {
      if (res.code === '1') {
        dispatch(changeInfo(query))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

//1 初始化加载mine的信息
export const loadMineInfo = (query) => {
  return dispatch => {
    loadMine(query).then(res => {
      if (res.code === '1') {
        dispatch(initMine(res.data))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  }
}

// 3-1 分享利润更改
export const changeShare = (num, flag) => {
  return {
    type: types.SHARE_CHANGE,
    num,
    flag
  }
}

// 3-2 购物积分更改
export const changeShoppoint = (num, flag) => {
  return {
    type: types.SHOPPOINT_CHANGE,
    num,
    flag
  }
}
// 3-3 购物积分更改
export const changeMallpoint = (num, flag) => {
  return {
    type: types.MALLPOINT_CHANGE,
    num,
    flag
  }
}

//2-2 改变信息
export const changeInfo = (info) => {
  return {
    type: types.CHANGE_MINE_INFO,
    info
  }
}

//1-1 初始化保存mine
export const initMine = (info) => {
  return {
    type: types.LOAD_MINE,
    info
  }
}
