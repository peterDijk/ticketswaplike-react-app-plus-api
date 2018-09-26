import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
// import {userId} from '../jwt'
import {isAdmin} from '../jwt'
import EventsList from './EventsList'


import {loadEvents, addEvent, editEvent, deleteEvent} from '../actions/events'

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
        name: '',
        desc: '',
        imageUrl: '',
        startDate: '',
        endDate: ''
      }
    })
  }

  onEdit = (eventId) => {
    const {events} = this.props
    const event = events.list.find(event => event.id === eventId)
    this.setState({
      ...this.state,
      editMode: true,
      formValues: {
        id: eventId,
        name: event.name,
        desc: event.desc,
        imageUrl: event.imageUrl,
        startDate: this.formatDateTimeForPicker(event.startDate),
        endDate: this.formatDateTimeForPicker(event.endDate)
      }
    })
  }

  formatDateTimeForPicker(date) {
    let d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()
    let hours = '' + d.getHours()
    let minutes = '' + d.getMinutes()
  
    if (hours.length < 2) hours = '0' + hours

    if (minutes.length < 2) minutes = '0' + minutes
  
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
  
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  onChange = (event) => {
    // update the formValues property with the new data from the input field
    console.log(event.target.value)
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
    this.props.addEvent(this.state.formValues)
  }  
 
  onSubmitEdit = (event) => {
    event.preventDefault()
    this.setState({
      editMode: false
    })
    this.props.editEvent(this.state.formValues.id, this.state.formValues)
  }    


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
    if (!values.orderBy) values.orderBy = 'startDate'
    if (!values.direction) values.direction = 'ASC'
    this.props.loadEvents(`page=${values.page}`, `orderBy=${values.orderBy}`, `direction=${values.direction}`)
  }

  render() {
    const {events} = this.props
    if (events.length === 0) return 'Loading events...'
    return (
        <EventsList 
          events={events} 
          authenticated={this.props.authenticated}
          onAddFn={this.onAdd}
          addMode={this.state.addMode}
          onChangeFn={this.onChange}
          onSubmitFn={this.onSubmit}
          formValues={this.state.formValues}
          isAdmin={this.props.isAdmin}
          onEditFn={this.onEdit}
          editMode={this.state.editMode}
          onSubmitEditFn={this.onSubmitEdit}
          deleteEventFn={this.props.deleteEvent}
        />
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  // userId: state.currentUser && userId(state.currentUser.jwt),
  isAdmin: state.currentUser && isAdmin(state.currentUser.jwt),
  events: state.events
})

const mapDispatchtoProps = {
  loadEvents,
  addEvent,
  editEvent,
  deleteEvent
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventsListContainer)