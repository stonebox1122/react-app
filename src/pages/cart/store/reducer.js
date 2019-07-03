import { fromJS } from 'immutable';
import * as types from './actionType';
const defalutState = fromJS({
  isShowCom: false,
  list:[]
})

export default (state=defalutState, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_COM:
      let type = state.get('isShowCom')
      return state.set('isShowCom', !type)
    default:
      return state;
  }
}