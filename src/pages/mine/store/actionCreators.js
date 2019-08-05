import * as commonActionCreators from '~/common/store/actionCreators'
import * as types from './actionTypes'
import {loadMine, changeMineInfo} from '$src/api'

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
