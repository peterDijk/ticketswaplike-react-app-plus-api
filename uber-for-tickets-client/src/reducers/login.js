import {USER_LOGIN_FAILED,USER_LOGIN_SUCCESS} from '../actions/users'

export default function (state = {}, {type, payload}) {
	switch (type) {
		case USER_LOGIN_FAILED:
			return {
				error: payload
			}
		case USER_LOGIN_SUCCESS:
			return {}

		default:
      return state
	}
}
