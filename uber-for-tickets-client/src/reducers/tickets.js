import {
  TICKETS_FETCHED,
  TICKET_ADD_SUCCESS
} from '../actions/tickets'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TICKETS_FETCHED:
      return action.payload
    case TICKET_ADD_SUCCESS:
      return {
        ...state, 
        list: [action.payload, ...state.list],
        count: state.count + 1
      }
    default: 
      return state
  }
}