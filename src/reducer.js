import ActionTypes from './actions/types';

const initialState = {
  pushNoticationSetup: false,
  playerId: null,
  logingIn: false,
  rut: '',
  clave: '',
  loginError: '',
  fetchNotifications: false,
  notifications: [],
  searchTerm: '',
  filteredNotifications: []
};

const filterNotifications = (notifications, searchTerm) => {
  searchTerm = searchTerm.toLowerCase()
  return notifications.filter(notif => {
    if(searchTerm === '') {
      return true
    } else {
      return (
        notif.heading.toLowerCase().indexOf(searchTerm) !== -1 ||
        notif.contents.toLowerCase().indexOf(searchTerm) !== -1
      )
    }
  })
}

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
      const filteredNotifications = filterNotifications(action.notifications, state.searchTerm)
      return Object.assign({}, state, {
        fetchingNotifications: true ,
        notifications,
        filteredNotifications
      })
    }

    case ActionTypes.FILTER_NOTIFICATIONS: {
      const filteredNotifications = filterNotifications(state.notifications, action.searchTerm)
      return Object.assign({}, state, {
        searchTerm: action.searchTerm,
        filteredNotifications
      })
    }

    case ActionTypes.LOGOUT: {
      let updatedState = initialState
      delete updatedState.playerId
      return Object.assign({}, state, updatedState)
    }

    default:
      return state;
  }

};
