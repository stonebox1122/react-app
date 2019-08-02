import * as commonActionCreators from '~/common/store/actionCreators'
import * as types from './actionTypes'
import {loadMine} from '$src/api'

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

export const initMine = (info) => {
  return {
    type: types.LOAD_MINE,
    info
  }
}