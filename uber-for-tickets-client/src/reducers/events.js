import {
  EVENTS_FETCHED,
  EVENT_ADD_SUCCESS,
  EVENT_EDIT_SUCCESS
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
    case EVENT_EDIT_SUCCESS:
      const newList = [...state.list]
      
      const eventToEditIndx = newList.findIndex(event => event.id === action.payload.id)
      newList[eventToEditIndx] = action.payload
      return {
        ...state,
        list: newList
      }
    default: 
      return state
  }
}