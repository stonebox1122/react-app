import { fromJS } from 'immutable';
import * as types from './actionTypes'
const defaultState = fromJS({
  list: [],
  currPage: 1,
  pageSize: 10,
  loadText: '上拉加载更多',
  load: false,
  hasMore: true,
  detail: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_GOODS:
      let i = state.get('currPage')
      let list = state.get('list')
      if (action.list.length === 10) {
        return state.merge({
          currPage: ++i,
          list: list.concat(action.list)
        })
      } else {
        return state.merge({
          hasMore: false,
          loadText: '已加载全部',
          list: list.concat(action.list)
        })
      }
    case types.SAVE_DETAIL: 
      return state.merge({
        detail: action.info
      })
    default:
      return state
  }
}