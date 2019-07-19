// 使用redux-immutable将state全部转换为一个immutable对象
import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '~/home/store'
import { reducer as goodsReducer } from '~/goods/store'
import { reducer as cartReducer} from '~/cart/store'
import { reducer as loginReducer} from '~/common/login/store'

export default combineReducers({
  home: homeReducer,
  goods: goodsReducer,
  cart: cartReducer,
  login: loginReducer
})