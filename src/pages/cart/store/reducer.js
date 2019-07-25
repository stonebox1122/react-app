import { fromJS } from 'immutable'
import * as types from './actionType'
const defalutState = fromJS({
  isShowCom: false,
  list:[],
  selectAll: false,
  addressList: []
})

export default (state=defalutState, action) => {
  let list = state.get('list').toJS();
  switch (action.type) {
    case types.TOGGLE_SHOW_COM: // 切换子页面的显示隐藏
      let type = state.get('isShowCom')
      return state.set('isShowCom', !type)
    case types.TOGGLE_SELECT: // 切换选中状态
      let id = action.id
      let flag = true
      list = list.map(e => {
        if (e.gid === id) {
          e.selected = !e.selected
        }
        if (e.selected === false) {
          flag = false
        }
        return e
      });
      return state.set('list', fromJS(list)).set('selectAll', flag)
    case types.TOGGLE_SELECT_ALL: // 全选 取消全选
      if (state.get('selectAll')) {
        list = list.map(e => {
          e.selected = false
          return e;
        })
      } else {
        list = list.map(e => {
          e.selected = true
          return e;
        })
      }
      return state.set('selectAll', !state.get('selectAll')).set('list', fromJS(list))
    case types.CHANGE_NUM: // 购物车更改商品数量
      list.forEach(e => {
        if (e.gid === action.id) {
          action.way === 'increase'? e.num+=1 : e.num-=1
          if (e.num<1) {
            e.num =1
          }
        }
      });
      return state.set('list', fromJS(list))
    case types.ADD_CART: // 添加到购物车
      let isHave = false
      list.forEach(e => {
        // 如果同商品同型号直接加数量
        if (e.gid === action.query.gid && e.valueid === action.query.valueid) {
          isHave = true
          e.num += action.query.num
        }
      })
      if (!isHave) {
        list.push(action.query)
      }
      return state.set('list', fromJS(list))
    default:
      return state;
  }
}