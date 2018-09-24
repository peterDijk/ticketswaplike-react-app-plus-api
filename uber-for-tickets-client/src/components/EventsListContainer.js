import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {userId} from '../jwt'

class EventsListContainer extends React.PureComponent {


  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  events: state.events
})

const mapDispatchtoProps = {
  // getEvents
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventsListContainer)