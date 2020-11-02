import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGING_IN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';
import { SET_MESSAGE } from '../message/types';

import authService from '../../services/auth.service';

export const register = (user) => (dispatch) => {
  return authService.register(user).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: 'Prisiregistruota',
      });

      return Promise.resolve('Prisiregistruota');
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const login = (userCredentials) => (dispatch) => {
  dispatch({ type: LOGING_IN });
  return authService.login(userCredentials).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(message);
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};
