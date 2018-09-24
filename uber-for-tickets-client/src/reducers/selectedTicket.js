import {
  TICKET_LOADED
} from '../actions/selectTicket'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TICKET_LOADED:
    return action.payload
    default: 
      return state
  }
}