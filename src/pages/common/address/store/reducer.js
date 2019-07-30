import {fromJS} from 'immutable'
import * as types from './actionTypes'

const defaultState = fromJS({
  list: [], // 地址列表
  cityList: [] // 省市区信息
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SAVE_ADDR_LIST:
      return state.set('list', fromJS(action.list));
    case types.CITY_LIST:
      return state.set('cityList', fromJS(action.list));
    // case types.SAVE_NEW_ADDR:
    //   return state
    default:
      return state;
  }
}