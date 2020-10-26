
import { reducer as PlaReducer } from './play'
// 将最外层的state转化成immutable对象
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  play: PlaReducer,
})