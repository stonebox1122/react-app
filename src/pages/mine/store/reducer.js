import {fromJS} from 'immutable';
import * as types from './actionTypes'
const defaultState = fromJS({
  mineInfo: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOAD_MINE:
      return state.set('mineInfo', fromJS(action.info));
    case types.CHANGE_MINE_INFO:
      let mineInfo = state.get('mineInfo').toJS()
      switch (action.info.flag) {
        case 'sex':
          mineInfo.userinfo.sex = action.info.sex
          return state.set('mineInfo',  fromJS(mineInfo));
        case 'birthday':
          mineInfo.userinfo.birthday = action.info.birthday
          return state.set('mineInfo',  fromJS(mineInfo));
        case 'truename':
          mineInfo.userinfo.truename = action.info.truename
          return state.set('mineInfo',  fromJS(mineInfo));
        case 'idcard':
          mineInfo.userinfo.idcard = action.info.idcard
          return state.set('mineInfo',  fromJS(mineInfo));
        default:
          return state;
      }
    default:
      return state;
  } 
}