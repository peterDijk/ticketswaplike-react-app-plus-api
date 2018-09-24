import axios from 'axios'
import {apiUrl} from '../constants'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'

function ticketsFetched({tickets, count, next, previous, event}) {
  return {
    type: TICKETS_FETCHED,
    payload: {list: tickets, count, next, previous, event}
  }
}


export function loadTickets(eventId, pagination, orderBy, direction) {
  return async (dispatch) => {
      try {
        const request = await axios(`${apiUrl}/events/${eventId}/tickets/?${pagination}&${orderBy}&${direction}`)
        dispatch(ticketsFetched(request.data))
      }
      catch (error) {
        console.log(error)
      }
  }
}