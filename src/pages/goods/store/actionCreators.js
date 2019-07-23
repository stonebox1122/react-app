import * as types from './actionTypes'
import * as commonActionCreators from '~/common/store/actionCreators'
import { getAllGoodsList  } from '$src/api'

// 将数据添加到store
export const addList = (list) => {
  return {
    type: types.GET_GOODS,
    list
  }
}

// export const toggleLoad = (info) => {
//   return {
//     type: types.SET_LOAD,
//     info
//   }
// } 

// 数据请求的函数
export const getList = (query) => {
  return (dispatch) => {
    // 开始loading
    // dispatch(toggleLoad({
    //   text: '加载中',
    //   load: true
    // }))
    getAllGoodsList(query).then(res => {
      if (res.code === '1') {
        // 保存数据 更新列表状态
        dispatch(addList(res.data.list))
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
      // 结束loading
      // dispatch(toggleLoad({
      //   text: '加载完成',
      //   load: false
      // }))
    })
  }
}
