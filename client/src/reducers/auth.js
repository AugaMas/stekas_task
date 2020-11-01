import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGING_IN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/authentication/types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user, isLoggingIn: false }
  : { isLoggedIn: false, user: null, isLoggingIn: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      };
    case LOGING_IN:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        isLoggingIn: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
        user: null,
      };
    default:
      return state;
  }
}
