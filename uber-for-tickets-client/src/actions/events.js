import axios from 'axios'
import {apiUrl} from '../constants'
import * as request from 'superagent'
import {isExpired} from '../jwt'
import {logout} from './users'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENT_ADD_SUCCESS = 'EVENT_ADD_SUCCESS'
export const EVENT_EDIT_SUCCESS = 'EVENT_EDIT_SUCCESS'
export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS'

function eventsFetched({events, count, next, previous, range}) {
  return {
    type: EVENTS_FETCHED,
    payload: {list: events, count, next, previous, range}
  }
}

function eventAddSuccess(event) {
  return {
    type: EVENT_ADD_SUCCESS,
    payload: event
  }
}

function eventEditSuccess(event) {
  return {
    type: EVENT_EDIT_SUCCESS,
    payload: event
  }
}

function eventDeleteSuccess(event) {
  return {
    type: EVENT_DELETE_SUCCESS,
    payload: event
  }
}


export function loadEvents(pagination, orderBy, direction) {
  return async (dispatch) => {
      try {
        const request = await axios(`${apiUrl}/events/?${pagination}&${orderBy}&${direction}`)
        dispatch(eventsFetched(request.data))
      }
      catch (error) {
        console.log(error)
      }
  }
}

export const addEvent = (formValues) => (dispatch, getState) => {
  const {name, desc, imageUrl, startDate, endDate} = formValues
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${apiUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({name, desc, imageUrl, startDate, endDate})
    .then(result => dispatch(eventAddSuccess(result.body)))
    .catch(err => console.error(err))
}

export const editEvent = (eventId, formValues) => (dispatch, getState) => {
  const {name, desc, imageUrl, startDate, endDate} = formValues
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${apiUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({name, desc, imageUrl, startDate, endDate})
    .then(result => dispatch(eventEditSuccess(result.body)))
    .catch(err => console.error(err))
}

export const deleteEvent = (eventId) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .delete(`${apiUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(eventDeleteSuccess(result.body)))
    .catch(err => console.error(err))
}