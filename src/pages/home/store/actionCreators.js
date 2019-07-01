// actionCreator 主要是为了格式化dispath
import * as types from './actionTypes'

export const toggleComponent = () => {
  return {
    type: types.TOGGLE_SHOW_COM
  }
}