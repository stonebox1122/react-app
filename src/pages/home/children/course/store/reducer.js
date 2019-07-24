import { fromJS } from 'immutable';
import * as types from './actionTypes'
const defaultState = fromJS({
  list: [],
  currPage: 1,
  pageSize: 10,
  loadText: '上拉加载更多',
  load: false,
  hasMore: true
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_LIST:
      let i = state.get('currPage')
      let list = state.get('list')
      if (action.list.length === 10) {
        return state.merge({
          currPage: ++i,
          list: fromJS(list.concat(action.list))
        })
      } else {
        return state.merge({
          hasMore: false,
          loadText: '已加载全部',
          list: fromJS(list.concat(action.list))
        })
      }
    default:
      return state
  }
}