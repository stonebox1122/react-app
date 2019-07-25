import { fromJS } from 'immutable';
import * as types from './actionTypes';

const defaultState = fromJS({
  loading: false, // 接口请求时的loading
  showModal: false,
  modalText: '',
  modalTitle: ''
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_LOADING:
      let flag = state.get('loading')
      return state.set('loading', !flag)
    case types.TOGGLE_MODAL:
      let type = state.get('showModal');
      if (action.msg) {
        return state.merge({
          showModal: !type,
          modalText: action.msg,
          modalTitle: action.title
        })
      } else {
        return state.merge({
          showModal: !type
        })
      }
    default:
      // 注意这里要默认返回
      return state;
  }
}
