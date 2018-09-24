import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import queryString from 'query-string'
import {userId} from '../jwt'
import EventsList from './EventsList'


import {loadEvents} from '../actions/events'

class EventsListContainer extends React.PureComponent {

  componentDidMount() {
    this.loadPagEvents()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.loadPagEvents()
    }
  }

  loadPagEvents = () => {
    const values = queryString.parse(this.props.location.search)
    if (!values.page) values.page = 1
    if (!values.orderBy) values.orderBy = 'dateCreated'
    if (!values.direction) values.direction = 'ASC'
    this.props.loadEvents(`page=${values.page}`, `orderBy=${values.orderBy}`, `direction=${values.direction}`)
  }

  render() {
    const {events} = this.props
    if (events.length === 0) return 'Loading events...'
    return (
        <EventsList events={events.list} count={events.count} next={events.next} previous={events.previous}/>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.events
})

const mapDispatchtoProps = {
  loadEvents
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventsListContainer)