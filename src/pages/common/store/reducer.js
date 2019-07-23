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
      return state.merge({
        showModal: !type,
        modalText: action.msg || '错误',
        modalTitle: action.title
      })
    default:
      // 注意这里要默认返回
      return state;
  }
}
