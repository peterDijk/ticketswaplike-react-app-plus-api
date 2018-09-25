import {
  TICKET_LOADED,
  COMMENTS_LOADED,
  COMMENT_ADD_SUCCESS
} from '../actions/selectTicket'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TICKET_LOADED:
      return action.payload
    case COMMENTS_LOADED:
      return {...state, comments: action.payload}
    case COMMENT_ADD_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          list: [action.payload, ...state.comments.list],
          count: state.comments.count + 1
        }
    }
    default: 
      return state
  }
}