import axios from 'axios'
import {apiUrl} from '../constants'

export const TICKET_LOADED = 'TICKET_LOADED'
export const FRAUD_RISK_FETCHED = 'FRAUD_RISK_FETCHED'
export const COMMENTS_LOADED = 'COMMENTS_LOADED'

function ticketLoaded(ticket) {
  return {
    type: TICKET_LOADED,
    payload: ticket
  }
}

function commentsLoaded({comments, count, next, previous}) {
  return {
    type: COMMENTS_LOADED,
    payload: {list: comments, count, next, previous}
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

export async function getFraudRisk(ticketId) {
      try {
        const request = await axios(`${apiUrl}/tickets/${ticketId}/fraudrisks`)
        return request.data
      }
      catch (error) {
        console.log(error)
      }
}

export function loadComments(ticketId) {
  return async (dispatch) => {
    try {
      const request = await axios(`${apiUrl}/tickets/${ticketId}/comments`)
      dispatch(commentsLoaded(request.data))
    }
    catch (error) {
      console.log(error)
    }
  } 
}