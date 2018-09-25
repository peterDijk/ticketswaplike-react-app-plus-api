import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {loadTicket, loadComments} from '../actions/selectTicket'
import TicketDetails from './TicketDetails'

class TicketDetailsContainer extends React.PureComponent {


  loadPagComments = () => {
    const values = queryString.parse(this.props.location.search)
    const {ticketId} = this.props.match.params
    if (!values.page) values.page = 1
    if (!values.orderBy) values.orderBy = 'dateCreated'
    if (!values.direction) values.direction = 'DESC'
    this.props.loadComments(ticketId, `page=${values.page}`, `orderBy=${values.orderBy}`, `direction=${values.direction}`)
  }

  componentDidMount() {
    this.props.loadTicket(this.props.match.params.ticketId)
    this.loadPagComments()
    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.search !== this.props.location.search) {
      this.loadPagComments()
    }
  }


  render() {
    const {ticket} = this.props
    if (!ticket.id) return 'Loading ticket..'
    return (
      <TicketDetails ticket={ticket} />
    )
  }
}

const mapStateToProps = (state) => ({
  ticket: state.selectedTicket
})

const mapDispatchtoProps = {
  loadTicket,
  loadComments
}

export default connect(mapStateToProps, mapDispatchtoProps)(TicketDetailsContainer)