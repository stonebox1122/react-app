// reducer中只负责数据的修改 获取在creator中
import { fromJS } from 'immutable';
import * as types from './actionTypes';
import { setStore } from '$src/common/js/utils'

const defaultState = fromJS({
  uid: '',
  token: '',
  islogin: false
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
        islogin: fromJS(islogin)
      })
    default:
      // 注意这里要默认返回
      return state;
  }
}
