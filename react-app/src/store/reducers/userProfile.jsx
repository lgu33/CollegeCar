import { GET_USER_PROFILE } from '../../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  first_name: '', 
  last_name: '',
  username: '',
  email: '', 
  educational_attainment: '', 
  dob: '', 
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case GET_USER_PROFILE:
      return {
        isAuthenticated: !isEmpty(action.user),
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        username: action.user.username,
        email: action 
      };
    default: return state;
  }
}