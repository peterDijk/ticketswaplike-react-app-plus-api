import {
  TICKET_LOADED,
  COMMENTS_LOADED
} from '../actions/selectTicket'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TICKET_LOADED:
      return action.payload
    case COMMENTS_LOADED:
      return {...state, comments: action.payload}
    default: 
      return state
  }
}