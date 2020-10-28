import { 
  SET_INFO,
  SET_LIST,
  SET_PRAISE,
  SET_MODEL
} from './actionType'

export const setInfo = () => ({
  type: SET_INFO
});
export const setList= (value) => ({
  type: SET_LIST,
  value
});
export const praiseVideo= (value) => ({
  type: SET_PRAISE,
  value
});
export const setModel= (value) => ({
  type: SET_MODEL,
  value
});