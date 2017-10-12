import { actionTypes } from './actions';

function authReducer(state = { signedIn: false, roles: [] }, action) {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return Object.assign({}, state, {
        signedIn: action.auth.signedIn,
        roles: action.auth.roles
      });

    case actionTypes.LOG_OUT:
      return Object.assign({}, state, {
        signedIn: false,
        roles: ['ROLE_ANONYMOUS']
      });

    default:
      return state;
  }
}

export default authReducer;
