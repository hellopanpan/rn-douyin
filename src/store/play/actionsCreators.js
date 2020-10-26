import { 
  SET_INFO,
  SET_LIST
} from './actionType'

export const setInfo = () => ({
  type: SET_INFO
});
export const setList= (value) => ({
  type: SET_LIST,
  value
});