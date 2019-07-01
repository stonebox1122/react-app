import { fromJS } from 'immutable';
import * as types from './actionTypes';

const defaultState = fromJS({
  isShowCom: false
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_COM:
      let type = state.get('isShowCom')
      return state.set('isShowCom', !type)
    default:
      // 注意这里要默认返回
      return state;
  }
}
