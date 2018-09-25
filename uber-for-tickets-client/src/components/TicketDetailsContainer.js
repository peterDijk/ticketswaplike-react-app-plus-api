import * as React from 'react'
import {connect} from 'react-redux'
import {loadTicket, getFraudRisk} from '../actions/selectTicket'
import TicketDetails from './TicketDetails'

class TicketDetailsContainer extends React.PureComponent {

  componentDidMount() {
    this.props.loadTicket(this.props.match.params.ticketId)
    // this.props.getFraudRisk(this.props.match.params.ticketId)
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
  getFraudRisk
}

export default connect(mapStateToProps, mapDispatchtoProps)(TicketDetailsContainer)