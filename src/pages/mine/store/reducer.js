import {fromJS} from 'immutable';
import * as types from './actionTypes'
const defaultState = fromJS({
  mineInfo: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOAD_MINE:
      return state.set('mineInfo', fromJS(action.info));
    default:
      return state;
  } 
}