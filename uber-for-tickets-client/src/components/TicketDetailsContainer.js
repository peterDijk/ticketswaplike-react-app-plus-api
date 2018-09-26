import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {userId} from '../jwt'
import {loadTicket, loadComments, addComment, editTicket} from '../actions/selectTicket'
import TicketDetails from './TicketDetails'

class TicketDetailsContainer extends React.PureComponent {
  state = {
    addMode: false,
    editTicketMode: false
  }

  onEditTicket = () => {
    const {ticket} = this.props
    this.setState({
      ...this.state,
      editTicketMode: true,
      formValues: {
        desc: ticket.desc,
        price: ticket.price,
        imageUrl: ticket.imageUrl
      }
    })
  }

  onSubmitTicket = (event) => {
    event.preventDefault()
    this.setState({
      editTicketMode: false
    })
    this.props.editTicket(this.props.ticket.id, this.state.formValues)    
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
        userId={this.props.userId}
        onAddFn={this.onAdd}
        onChangeFn={this.onChange}
        onSubmitFn={this.onSubmit}
        addMode={this.state.addMode}
        values={this.state.formValues}
        editTicketMode={this.state.editTicketMode}
        editTicketValues={this.state.formValues}
        onEditTicketFn={this.onEditTicket}
        onSubmitTicketFn={this.onSubmitTicket}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  ticket: state.selectedTicket
})

const mapDispatchtoProps = {
  loadTicket,
  loadComments,
  addComment,
  editTicket
}

export default connect(mapStateToProps, mapDispatchtoProps)(TicketDetailsContainer)