// 使用redux-immutable将state全部转换为一个immutable对象
import { combineReducers } from 'redux-immutable';

import { reducer as homeReducer } from '~/home/store'
import { reducer as towerReducer } from '~/home/children/tower/store'
import { reducer as chosenReducer } from '~/home/children/chosen/store'
import { reducer as healthyReducer } from '~/home/children/healthy/store'
import { reducer as excellentReducer } from '~/home/children/excellent/store'
import { reducer as courseReducer } from '~/home/children/course/store'
import { reducer as videoListReducer } from '~/home/children/videoList/store'
import { reducer as goodsReducer } from '~/goods/store'
import { reducer as cartReducer} from '~/cart/store'
import { reducer as loginReducer} from '~/common/login/store'
import { reducer as commonReducer} from '~/common/store'
import { reducer as addressReducer } from '~/common/address/store'

export default combineReducers({
  home: homeReducer,
  goods: goodsReducer,
  cart: cartReducer,
  login: loginReducer,
  common: commonReducer,
  tower: towerReducer,
  course: courseReducer,
  video: videoListReducer,
  healthy: healthyReducer,
  excellent: excellentReducer,
  chosen: chosenReducer,
  address: addressReducer
})