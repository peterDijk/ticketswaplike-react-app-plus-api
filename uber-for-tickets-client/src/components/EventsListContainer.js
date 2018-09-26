import * as React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {userId} from '../jwt'
import EventsList from './EventsList'


import {loadEvents, addEvent} from '../actions/events'

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
    this.props.addEvent(this.state.formValues)
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
        />
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  // userId: state.currentUser && userId(state.currentUser.jwt),
  events: state.events
})

const mapDispatchtoProps = {
  loadEvents,
  addEvent
}

export default connect(mapStateToProps, mapDispatchtoProps)(EventsListContainer)