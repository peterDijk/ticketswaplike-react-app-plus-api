import * as request from 'superagent'
import {apiUrl} from '../constants'
import {isExpired} from '../jwt'

export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USERS = 'UPDATE_USERS'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'

export const USER_LOGOUT = 'USER_LOGOUT'

export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS'
export const USER_SIGNUP_FAILED = 'USER_SIGNUP_FAILED'

export const logout = () => ({
  type: USER_LOGOUT
})

const userLoginSuccess = (login) => ({
  type: USER_LOGIN_SUCCESS,
  payload: login
})

const userLoginFailed = (error) => ({
  type: USER_LOGIN_FAILED,
  payload: error || 'Unknown error'
})

const userSignupFailed = (error) => ({
  type: USER_SIGNUP_FAILED,
  payload: error || 'Unknown error'
})

const userSignupSuccess = () => ({
  type: USER_SIGNUP_SUCCESS
})

const updateUsers = (users) => ({
  type: UPDATE_USERS,
  payload: users
})

const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user
})

export const login = (email, password) => (dispatch) =>
	request
		.post(`${apiUrl}/logins`)
    .send({email, password})
    .then(result => {
      dispatch(userLoginSuccess(result.body))
      // dispatch(getUsers())
    })
    .catch(err => {
    	if (err.status === 400) {
        dispatch(userLoginFailed(err.response.body.message))
        
    	}
    	else {
    		console.error(err)
    	}
    })

export const signup = (firstName, lastName, email, password) => (dispatch) =>
	request
		.post(`${apiUrl}/users`)
		.send({ firstName, lastName, email, password })
		.then(result => {
			dispatch(userSignupSuccess())
		})
		.catch(err => {
			if (err.status === 400) {
        
				dispatch(userSignupFailed({message: err.response.body.message, errors: err.response.body.errors}))
			}
			else {
				console.error(err)
			}
		})

// export const getUsers = () => (dispatch, getState) => {
//   const state = getState()
//   if (!state.currentUser) return null
//   const jwt = state.currentUser.jwt

//   if (isExpired(jwt)) return dispatch(logout())

//   request
//     .get(`${apiUrl}/users`)
//     .set('Authorization', `Bearer ${jwt}`)
//     .then(result => dispatch(updateUsers(result.body)))
//     .catch(err => console.error(err))
// }

export const getUser = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${apiUrl}/users/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateUser(result.body)))
    .catch(err => console.error(err))
}
