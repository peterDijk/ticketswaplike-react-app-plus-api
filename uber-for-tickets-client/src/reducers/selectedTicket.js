import {
  TICKET_LOADED,
  COMMENTS_LOADED,
  COMMENT_ADD_SUCCESS,
  EDIT_TICKET_SUCCESS,
  DELETE_TICKET_SUCCESS
} from '../actions/selectTicket'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case TICKET_LOADED:
      return action.payload
    case COMMENTS_LOADED:
      return {...state, comments: action.payload}
    case COMMENT_ADD_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          list: [action.payload, ...state.comments.list],
          count: state.comments.count + 1
        }
      }
    case EDIT_TICKET_SUCCESS:
      return {
        ...state,
        price: action.payload.price,
        desc: action.payload.desc,
        imageUrl: action.payload.imageUrl
      }
    case DELETE_TICKET_SUCCESS:
      const newCommentsList = [...state.comments.list]
      const commentsExclDeleted = newCommentsList.filter(comment => comment.id !== action.payload.id)
      return {
        ...state,
        comments: {
          ...state.comments,
          list: commentsExclDeleted,
          count: state.comments.count - 1
        }
      }
    default: 
      return state
  }
}