import {fromJS} from 'immutable';
import * as types from './actionTypes'
const defaultState = fromJS({
  mineInfo: {}
})

export default (state = defaultState, action) => {
  let mineInfo = state.get('mineInfo').toJS()
  switch (action.type) {
    case types.LOAD_MINE:
      return state.set('mineInfo', fromJS(action.info));
    case types.CHANGE_MINE_INFO:
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
    case types.SHARE_CHANGE:
      let {userpurse:{profitsharing}} = mineInfo
      profitsharing = parseFloat(profitsharing)
      if (action.flag === 'increase') {
        profitsharing += parseFloat(action.num)
      } else {
        profitsharing -= parseFloat(action.num)
      }
      mineInfo.userpurse.profitsharing = profitsharing
      return state.set('mineInfo',  fromJS(mineInfo));
    case types.SHOPPOINT_CHANGE:
      let {userpurse:{shoppingpoints}} = mineInfo
      shoppingpoints = parseFloat(shoppingpoints)
      if (action.flag === 'increase') {
        shoppingpoints += parseFloat(action.num)
      } else {
        shoppingpoints -= parseFloat(action.num)
      }
      mineInfo.userpurse.shoppingpoints = shoppingpoints
      return state.set('mineInfo',  fromJS(mineInfo));
    case types.MALLPOINT_CHANGE:
        let {userpurse:{mallpoints}} = mineInfo
        mallpoints = parseFloat(mallpoints)
        if (action.flag === 'increase') {
          mallpoints += parseFloat(action.num)
        } else {
          mallpoints -= parseFloat(action.num)
        }
        mineInfo.userpurse.mallpoints = mallpoints
        return state.set('mineInfo',  fromJS(mineInfo));
    default:
      return state;
  } 
}