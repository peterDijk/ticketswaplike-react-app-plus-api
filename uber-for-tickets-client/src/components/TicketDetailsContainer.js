import * as React from 'react'
import {connect} from 'react-redux'
import {loadTicket, loadComments} from '../actions/selectTicket'
import TicketDetails from './TicketDetails'

class TicketDetailsContainer extends React.PureComponent {

  componentDidMount() {
    this.props.loadTicket(this.props.match.params.ticketId)
    this.props.loadComments(this.props.match.params.ticketId)
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