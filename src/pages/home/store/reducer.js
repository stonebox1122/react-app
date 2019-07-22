import { fromJS } from 'immutable';
import * as types from './actionTypes';

const defaultState = fromJS({
  isShowCom: false, // 是否展示子组件
  banners: [],
  list_nlt: [],
  list_nlkc: [],
  list_ypq: [],
  list_nljk: [],
  list_jpq: [],
  list_jptj: [],
  list_jccx: [],
  list_mfsp: []
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_COM:
      let type = state.get('isShowCom')
      return state.set('isShowCom', !type)
    case types.INIT_HOME:
      return state.merge({
        banners: fromJS(action.data.banners),
        list_nlt: fromJS(action.data.goods.list_nlt),
        list_nlkc: fromJS(action.data.goods.list_nlkc),
        list_ypq: fromJS(action.data.goods.list_ypq),
        list_nljk: fromJS(action.data.goods.list_nljk),
        list_jpq: fromJS(action.data.goods.list_jpq),
        list_jptj: fromJS(action.data.goods.list_jptj),
        list_jccx: fromJS(action.data.goods.list_jccx),
        list_mfsp: fromJS(action.data.goods.list_mfsp)
      })
    default:
      // 注意这里要默认返回
      return state;
  }
}
