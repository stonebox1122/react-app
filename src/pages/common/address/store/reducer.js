import {fromJS} from 'immutable'
import * as types from './actionTypes'

const defaultState = fromJS({
  list: [], // 地址列表
  cityList: [], // 省市区信息
  currentAddress: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SAVE_ADDR_LIST:
      return state.set('list', fromJS(action.list));
    case types.CITY_LIST:
      return state.set('cityList', fromJS(action.list));
    case types.CHANGE_CURRENT_ADDR:
        return state.set('currentAddress', fromJS(action.info))
    default:
      return state;
  }
}