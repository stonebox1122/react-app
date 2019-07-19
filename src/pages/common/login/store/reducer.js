// reducer中只负责数据的修改 获取在creator中
import { fromJS } from 'immutable';
import * as types from './actionTypes';

const defaultState = fromJS({
  showModal: false,
  modalText: '',
  uid: '',
  token: ''
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case types.SET_INFO:
      return state;
    case types.TOGGLE_MODAL:
      let flag = state.get('showModal');
      return state.set('showModal', !flag).set('modalText', action.msg);
    default:
      // 注意这里要默认返回
      return state;
  }
}
