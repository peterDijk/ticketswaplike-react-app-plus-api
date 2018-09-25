import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {loadTicket, loadComments, addComment} from '../actions/selectTicket'
import TicketDetails from './TicketDetails'

class TicketDetailsContainer extends React.PureComponent {
  state = {
    addMode: false,
    editMode: false
  }

  onAdd = () => {
    // intialize add mode:
    this.setState({
      ...this.state,
      addMode: true,
      formValues: {
        comment: ''
      }
    })
  }

  onChange = (event) => {
    // update the formValues property with the new data from the input field
    this.setState({
      formValues: {
        ...this.state.formValues,
        [event.target.name]: event.target.value
      }
    })
  }
 
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      addMode: false
    })
    this.props.addComment(this.props.ticket.id, this.state.formValues)
  }  

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
      <TicketDetails 
        ticket={ticket} 
        authenticated={this.props.authenticated}
        onAddFn={this.onAdd}
        onChangeFn={this.onChange}
        onSubmitFn={this.onSubmit}
        addMode={this.state.addMode}
        values={this.state.formValues}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  ticket: state.selectedTicket
})

const mapDispatchtoProps = {
  loadTicket,
  loadComments,
  addComment
}

export default connect(mapStateToProps, mapDispatchtoProps)(TicketDetailsContainer)