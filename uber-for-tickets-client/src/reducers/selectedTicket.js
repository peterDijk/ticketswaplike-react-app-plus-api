import {
  TICKET_LOADED,
  FRAUD_RISK_FETCHED
} from '../actions/selectTicket'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TICKET_LOADED:
      return action.payload
    default: 
      return state
  }
}