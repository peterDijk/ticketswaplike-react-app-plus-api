import axios from 'axios'
import * as request from 'superagent'
import {apiUrl} from '../constants'
import {isExpired} from '../jwt'
import {logout} from './users'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const TICKET_ADD_SUCCESS = 'TICKET_ADD_SUCCESS'

function ticketsFetched({tickets, count, next, previous, event}) {
  return {
    type: TICKETS_FETCHED,
    payload: {list: tickets, count, next, previous, event}
  }
}

function ticketAddSuccess(ticket) {
  return {
    type: TICKET_ADD_SUCCESS,
    payload: ticket
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

export const addTicket = (eventId, formValues) => (dispatch, getState) => {
  const {price, desc, imageUrl} = formValues
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${apiUrl}/events/${eventId}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({price, desc, imageUrl})
    .then(result => dispatch(ticketAddSuccess(result.body)))
    .catch(err => console.error(err))
}
