import {
  EVENTS_FETCHED,
  EVENT_ADD_SUCCESS
} from '../actions/events'

export default (state = [], action = {}) => {
  switch (action.type) {
    case EVENTS_FETCHED:
      return action.payload
    case EVENT_ADD_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    default: 
      return state
  }
}