import { fromJS } from 'immutable';
import * as types from './actionTypes'
const defaultState = fromJS({
  all: {
    currPage: 1,
    pageSize: 10,
    loadText: '上拉加载更多',
    load: false,
    hasMore: true,
    list: [] // 全部
  },
  free: {
    currPage: 1,
    pageSize: 10,
    loadText: '上拉加载更多',
    load: false,
    hasMore: true,
    list: [] // 免费
  },
  wonderful: {
    currPage: 1,
    pageSize: 10,
    loadText: '上拉加载更多',
    load: false,
    hasMore: true,
    list: [] // 精彩
  },
  chosen: {
    currPage: 1,
    pageSize: 10,
    loadText: '上拉加载更多',
    load: false,
    hasMore: true,
    list: [] // 精选
  },
})

export default (state = defaultState, action) => {
  var type = null;
  switch (action.type) {
    case types.ADD_LIST:
      switch (action.flag) {
        case 10:
          type = 'all'
          break;
        case 4:
          type = 'wonderful'
          break;
        case 5:
          type = 'chosen'
          break;
        case 3:
          type = 'free'
          break;
        default:
          type = 'all'
          break;
      }
      let i = state.get(type).get('currPage')
      let list = state.get(type).get('list').toJS()
      if (action.list.length === 10) {
        return state.mergeIn([type], {
          currPage: ++i,
          list: fromJS(list.concat(action.list))
        })
      } else {
        return state.mergeIn([type], {
          hasMore: false,
          loadText: '已加载全部',
          list: fromJS(list.concat(action.list))
        })
      }
    default:
      return state
  }
}