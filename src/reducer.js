import ActionTypes from './actions/types';

const initialState = {
  pushNoticationSetup: false,
  playerId: null,
  loggingIn: false,
  rut: '',
  clave: '',
  loginError: '',
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
        loggingIn: true,
        loginError: ''
      })
    }

    case (ActionTypes.LOGIN_SUCCESS): {
      return Object.assign({}, state, {
        loggingIn: false,
        pushNoticationSetup: true,
        loginError: ''
      })
    }

    case (ActionTypes.LOGIN_ERROR): {
      return Object.assign({}, state, {
        loggingIn: false,
        loginError: action.message
      });
    }

    default:
      return state;
  }

};
