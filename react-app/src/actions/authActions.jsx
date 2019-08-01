import axios from 'axios';
import jwtDecode from 'jwt-decode';
import decode from 'jwt-decode';
import base64 from 'react-native-base64'
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user: user,
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/auth/login', data).then(res => {
      const token = res.data.auth_token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      console.log(jwtDecode(token))
    });
  }
}

export function register(data) {
  return dispatch => {
    return axios.post('/auth/register', data).then(res => {
      const token = res.data.auth_token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      console.log(jwtDecode(token))
    });
  }
}