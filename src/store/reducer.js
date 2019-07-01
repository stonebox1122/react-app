// 使用redux-immutable将state全部转换为一个immutable对象
import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '../pages/home/store'

export default combineReducers({
  home: homeReducer
})