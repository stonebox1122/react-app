// 使用redux-immutable将state全部转换为一个immutable对象
import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '~/home/store'
import { reducer as towerReducer } from '~/home/children/tower/store'
import { reducer as courseReducer } from '~/home/children/course/store'
import { reducer as goodsReducer } from '~/goods/store'
import { reducer as cartReducer} from '~/cart/store'
import { reducer as loginReducer} from '~/common/login/store'
import { reducer as commonReducer} from '~/common/store'

export default combineReducers({
  home: homeReducer,
  goods: goodsReducer,
  cart: cartReducer,
  login: loginReducer,
  common: commonReducer,
  tower: towerReducer,
  course: courseReducer
})