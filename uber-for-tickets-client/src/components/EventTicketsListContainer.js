import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import EventTicketsList from './EventTicketsList'
import {userId} from '../jwt'


import {loadTickets, addTicket} from '../actions/tickets'

class EventsListContainer extends React.PureComponent {
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
        desc: '',
        price: '',
        imageUrl: ''
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
    this.props.addTicket(this.props.tickets.event.id, this.state.formValues)
  }  

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
    if (!tickets.list) return 'Loading tickets...'
    return (
      <EventTicketsList 
        tickets={tickets} 
        authenticated={this.props.authenticated}
        onAddFn={this.onAdd}
        onChangeFn={this.onChange}
        onSubmitFn={this.onSubmit}
        addMode={this.state.addMode}
        values={this.state.formValues}
        userId={this.props.userId}
        /> 
    )
  }

}


const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  tickets: state.tickets
})

const mapDispatchtoProps = {
  loadTickets,
  addTicket
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventsListContainer)