import axios from 'axios'
import {apiUrl} from '../constants'

export const TICKET_LOADED = 'TICKET_LOADED'

function ticketLoaded(ticket) {
  return {
    type: TICKET_LOADED,
    payload: ticket
  }
}


export function loadTicket(ticketId) {
  return async (dispatch) => {
      try {
        const request = await axios(`${apiUrl}/tickets/${ticketId}`)
        dispatch(ticketLoaded(request.data))
      }
      catch (error) {
        console.log(error)
      }
  }
}