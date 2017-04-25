import ActionTypes from './types';
import * as async from './async';

export const savePlayerID = playerId => {
  return {
    type: ActionTypes.SAVE_PLAYER_ID,
    playerId
  };
};

export const changeField = (field, value) => {
  return {
    type: ActionTypes.CHANGE_FIELD,
    field,
    value
  };
};

export const loginStarted = () => {
  return {
    type: ActionTypes.LOGIN_STARTED
  };
};

export const loginSuccess = () => {
  return {
    type: ActionTypes.LOGIN_SUCCESS
  };
};

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_ERROR,
    message
  };
};

export const triggerLogin = (rut, clave, playerId) => {
  return dispatch => {
    dispatch(loginStarted());
    return async.loginAsync(rut, clave, playerId)
      .then(response => {
        if(response.status === 200) {
          if(response.data.success === true) {
            dispatch(loginSuccess());
          } else {
            dispatch(loginError(response.data.message));
          }
        }
      }, err => {
        console.log(err)
      });
  };
};

export const triggerfetchNotifications = (rut, clave, page) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FETCH_NOTIF_STARTED
    })
    return async.fetchNotifications(rut, clave, page)
      .then(resp => {
        dispatch({
          type: ActionTypes.FETCH_NOTIF_DONE,
          notifications: resp.data.data
        })
      }, err => {
        console.log(err);
      })
  }
}

export const filterNotifications = searchTerm => {
  return {
    type: ActionTypes.FILTER_NOTIFICATIONS,
    searchTerm
  }
}
