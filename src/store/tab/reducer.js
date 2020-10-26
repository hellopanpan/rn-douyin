import { 
  SET_TAB
 } from './actionType'
// immutable 库
import { fromJS} from 'immutable'

const defaultState = fromJS({
  tab: 0
})

export default (state = defaultState, action) => {
  if (action.type == SET_TAB ) {
    return state.set('tab', action.value)
  };
  return state;
}