import io from 'socket.io-client'
import {apiUrl} from './constants'

export default class SocketIO {
  socket = null

  connect(dispatch, jwt) {
    console.log('Connecting websocket')
    this.socket = io.connect(apiUrl, {
      query: `auth_token=${jwt}`
    });
    this.socket.on('action', payload => dispatch(payload))
  }

  disconnect() {
    console.log('Disconnecting websocket')
    this.socket.disconnect()
  }
}
