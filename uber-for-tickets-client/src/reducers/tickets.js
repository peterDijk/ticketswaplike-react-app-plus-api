import {
  TICKETS_FETCHED,
  TICKET_ADD_SUCCESS,
  TICKET_DELETE_SUCCESS
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
    case TICKET_DELETE_SUCCESS:
      const newTicketsList = [...state.list]
      const ticketsExclDeleted = newTicketsList.filter(ticket => ticket.id !== action.payload.id)
      return {
        ...state,
        list: ticketsExclDeleted,
        count: state.count - 1
      }
    default: 
      return state
  }
}