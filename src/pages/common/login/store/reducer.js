// reducer中只负责数据的修改 获取在creator中
import { fromJS } from 'immutable';
import * as types from './actionTypes';
import { setStore, removeStore } from '$src/common/js/utils'

const defaultState = fromJS({
  uid: '',
  token: '',
  islogin: false,
  ua: '',
  openid: ""
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case types.SET_INFO:
      let {uid,token,islogin} = action
      setStore('uid', uid)
      setStore('token', token)
      setStore('islogin', islogin)
      return state.merge({
        uid: fromJS(uid),
        token: fromJS(token),
        islogin: fromJS(true)
      })
    case types.EXIT:
      removeStore('uid')
      removeStore('token')
      removeStore('islogin')
      // removeStore('cart')
      return state.merge({
        uid: '',
        token: '',
        islogin: false
      })
    case types.SET_UA: 
      return state.merge({
        ua: action.ua
      })
    case types.SET_OPENID:
      setStore('openid', action.id)
      return state.merge({
        openid: action.id
      })
    default:
      // 注意这里要默认返回
      return state;
  }
}
