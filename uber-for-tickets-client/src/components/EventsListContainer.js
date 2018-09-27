import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
// import {userId} from '../jwt'
import {isAdmin} from '../jwt'
import EventsList from './EventsList'
import {formatDateTimeForPicker} from '../lib/formatDateTime'


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
        location: '',
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
        location: event.location,
        imageUrl: event.imageUrl,
        startDate: formatDateTimeForPicker(event.startDate),
        endDate: formatDateTimeForPicker(event.endDate)
      }
    })
  }


  onChange = (event) => {
    // update the formValues property with the new data from the input field
    if (event.target.type === 'datetime-local' && event.target.value.split(':').length > 2) {
      // fix for iOS where datetime field adds seconds and mUi component doesn't like that
      event.target.value = event.target.value.slice(0, -3)
    }
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