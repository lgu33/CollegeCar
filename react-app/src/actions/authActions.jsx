import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, GET_USER_PROFILE } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user: user,
  };
}

export function setUserProfile(user) {
  return {
    type: GET_USER_PROFILE,
    user: user,
  };
}

export function getCurrentUserProfile(data){
  return dispatch => {
    axios.get('/auth/status', data).then(res => {
      dispatch(setUserProfile(res.data));
    }).catch(function (error){
      console.log(error)
    })
  }
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
    });
  }
}