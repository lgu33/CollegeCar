import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userProfile from './userProfile';

export default combineReducers({
    auth: authReducer,
    userProfile: userProfile,
})