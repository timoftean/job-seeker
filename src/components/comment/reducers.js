import { actionTypes } from './actions';

function commentsReducer(state = { data: [] }, action) {
  switch (action.type) {
    case actionTypes.SAVE_COMMENT:
      return {
        data: state.data.concat(action.comment)
      };

    case actionTypes.DELETE_COMMENT:
      return state;

    case actionTypes.FIND_ALL_COMMENTS:
      return {
        data: action.comments
      };

    default:
      return state;
  }
}

export default commentsReducer;
