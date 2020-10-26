
import { reducer as PlaReducer } from './play'
import { reducer as TabReducer } from './tab'
// 将最外层的state转化成immutable对象
import { combineReducers } from 'redux-immutable'

export default combineReducers({
  play: PlaReducer,
  tab: TabReducer,
})