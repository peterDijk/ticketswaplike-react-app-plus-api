import {
  EVENTS_FETCHED,
  EVENT_ADD_SUCCESS,
  EVENT_EDIT_SUCCESS,
  EVENT_DELETE_SUCCESS
} from '../actions/events'

export default (state = [], action = {}) => {
  switch (action.type) {
    case EVENTS_FETCHED:
      const list = action.payload.list
      const eventsListTicketCount = list.map(event => {
        event = {...event, ticketsCount: event.tickets.length}
        delete event.tickets
        return event
      })
      action.payload.list = eventsListTicketCount
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
    case EVENT_DELETE_SUCCESS:
      const newEventsList = [...state.list]
      const eventsExclDeleted = newEventsList.filter(event => event.id !== action.payload.id)
      return {
        ...state,
        list: eventsExclDeleted,
        count: state.count - 1
    }
    default: 
      return state
  }
}