import ActionTypes from './actions/types';

const initialState = {
  pushNoticationSetup: false,
  playerId: null,
  logingIn: false,
  rut: '',
  clave: '',
  loginError: '',
  fetchNotifications: false
};

export default reducer = (state=initialState, action) => {

  switch (action.type) {

    case (ActionTypes.SAVE_PLAYER_ID): {
      return Object.assign({}, state, {
        playerId: action.playerId
      });
    }

    case (ActionTypes.CHANGE_FIELD): {
      return Object.assign({}, state, {
        [action.field]: action.value
      })
    }

    case (ActionTypes.LOGIN_STARTED): {
      return Object.assign({}, state, {
        logingIn: true,
        loginError: ''
      })
    }

    case (ActionTypes.LOGIN_SUCCESS): {
      return Object.assign({}, state, {
        logingIn: false,
        pushNoticationSetup: true,
        loginError: ''
      })
    }

    case (ActionTypes.LOGIN_ERROR): {
      return Object.assign({}, state, {
        logingIn: false,
        loginError: action.message
      });
    }

    case ActionTypes.FETCH_NOTIF_STARTED: {
      return Object.assign({}, state, { fetchingNotifications: true })
    }

    case ActionTypes.FETCH_NOTIF_DONE: {
      const notifications = action.notifications
      return Object.assign({}, state, {
        fetchingNotifications: true ,
        notifications
      })
    }

    default:
      return state;
  }

};
