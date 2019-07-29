import {fromJS} from 'immutable'
import * as types from './actionTypes'

const defaultState = fromJS({
  list: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SAVE_ADDR_LIST:
      return state.set('list', action.list);
    default:
      return state;
  }
}