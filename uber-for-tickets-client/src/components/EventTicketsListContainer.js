import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {userId} from '../jwt'
import EventTicketsList from './EventTicketsList'


import {loadTickets} from '../actions/tickets'

class EventsListContainer extends React.PureComponent {

  componentDidMount() {
    this.loadPagTickets()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.loadPagTickets()
    }
  }

  loadPagTickets = () => {
    const values = queryString.parse(this.props.location.search)
    const {eventId} = this.props.match.params
    if (!values.page) values.page = 1
    if (!values.orderBy) values.orderBy = 'dateCreated'
    if (!values.direction) values.direction = 'DESC'
    this.props.loadTickets(eventId, `page=${values.page}`, `orderBy=${values.orderBy}`, `direction=${values.direction}`)
  }

  render() {
    const {tickets} = this.props
    if (tickets.length === 0) return 'Loading tickets...'
    return (
      <EventTicketsList tickets={tickets}/> 
    )
  }

}


const mapStateToProps = (state) => ({
  tickets: state.tickets
})

const mapDispatchtoProps = {
  loadTickets
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventsListContainer)