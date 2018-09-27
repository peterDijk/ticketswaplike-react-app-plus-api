import axios from 'axios'
import * as request from 'superagent'
import {apiUrl} from '../constants'
import {isExpired} from '../jwt'
import {logout} from './users'

export const TICKET_LOADED = 'TICKET_LOADED'
export const FRAUD_RISK_FETCHED = 'FRAUD_RISK_FETCHED'
export const COMMENTS_LOADED = 'COMMENTS_LOADED'
export const COMMENT_ADD_SUCCESS = 'COMMENT_ADD_SUCCESS'
export const EDIT_TICKET_SUCCESS = 'EDIT_TICKET_SUCCESS'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'

function ticketLoaded(ticket) {
  return {
    type: TICKET_LOADED,
    payload: ticket
  }
}

function commentsLoaded({comments, count, next, previous, range}) {
  return {
    type: COMMENTS_LOADED,
    payload: {list: comments, count, next, previous, range}
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


function commentAddSuccess(comment) {
  return {
    type: COMMENT_ADD_SUCCESS,
    payload: comment
  }
}

function editTicketSuccess(ticket) {
  return {
    type: EDIT_TICKET_SUCCESS,
    payload: ticket
  }
}

function commentDeleteSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: comment
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

export function loadComments(ticketId, pagination, orderBy, direction) {
  return async (dispatch) => {
    try {
      const request = await axios(`${apiUrl}/tickets/${ticketId}/comments/?${pagination}&${orderBy}&${direction}`)
      dispatch(commentsLoaded(request.data))
    }
    catch (error) {
      console.log(error)
    }
  } 
}

export const addComment = (ticketId, formValues) => (dispatch, getState) => {
  const {comment} = formValues
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${apiUrl}/tickets/${ticketId}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({comment})
    .then(result => dispatch(commentAddSuccess(result.body)))
    .catch(err => console.error(err))
}

export const deleteComment = (commentId, ticketId) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${apiUrl}/tickets/${ticketId}/comments/${commentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(commentDeleteSuccess(result.body)))
    .catch(err => console.error(err))
}

export const editTicket = (ticketId, formValues) => (dispatch, getState) => {
  const {desc, price, imageUrl} = formValues
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${apiUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({desc, price, imageUrl})
    .then(result => dispatch(editTicketSuccess(result.body)))
    .catch(err => console.error(err))
}