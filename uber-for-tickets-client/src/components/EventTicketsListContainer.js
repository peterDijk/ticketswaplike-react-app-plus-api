import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Redirect} from 'react-router-dom'
import queryString from 'query-string'
import EventTicketsList from './EventTicketsList'
import {userId} from '../jwt'
import {isAdmin} from '../jwt'

import {loadTickets, addTicket, deleteTicket} from '../actions/tickets'

class EventsTicketsListContainer extends React.PureComponent {
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

  sortHandler = (column) => {
    const values = queryString.parse(this.props.location.search)
    if (!values.page) values.page = 1
    if (!values.orderBy) values.orderBy = 'dateCreated'
    if (!values.direction) values.direction = 'DESC'
    if (values.direction === 'DESC') {
      values.direction = 'ASC'
      // console.log(values.direction)
    }
    if (values.direction === 'ASC') values.direction = 'DESC'
    values.orderBy = column
    this.props.history.push(`?page=${values.page}&orderBy=${values.orderBy}&direction=${values.direction}`)
    // console.log(this.props.history)
  }

  render() {
    const {tickets} = this.props
    if (!tickets.list) return 'Loading tickets...'
    return (
      <EventTicketsList 
        tickets={tickets} 
        authenticated={this.props.authenticated}
        isAdmin={this.props.isAdmin}
        onAddFn={this.onAdd}
        onChangeFn={this.onChange}
        onSubmitFn={this.onSubmit}
        addMode={this.state.addMode}
        values={this.state.formValues}
        userId={this.props.userId}
        deleteTicketFn={this.props.deleteTicket}
        sortHandler={this.sortHandler}
        /> 
    )
  }

}


const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  isAdmin: state.currentUser && isAdmin(state.currentUser.jwt),
  tickets: state.tickets
})

const mapDispatchtoProps = {
  loadTickets,
  addTicket,
  deleteTicket
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(EventsTicketsListContainer))