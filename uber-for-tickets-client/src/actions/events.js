import axios from 'axios'
import {apiUrl} from '../constants'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'

function eventsFetched({events, count, next, previous}) {
  return {
    type: EVENTS_FETCHED,
    payload: {list: events, count, next, previous}
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