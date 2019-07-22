import { fromJS } from 'immutable';
import * as types from './actionTypes';

const defaultState = fromJS({
  isShowCom: false,
  loading: false // 接口请求时的loading
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_COM:
      let type = state.get('isShowCom')
      return state.set('isShowCom', !type)
    case types.TOGGLE_SHOW_LOADING:
      let flag = state.get('loading')
      return state.set('loading', !flag)
    default:
      // 注意这里要默认返回
      return state;
  }
}
