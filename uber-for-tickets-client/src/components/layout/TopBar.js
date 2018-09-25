import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'
import AccountIcon from '@material-ui/icons/AccountBox'
import {getUsers} from '../../actions/users'

class TopBar extends React.PureComponent {
  componentDidMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUsers()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authenticated !== this.props.authenticated) {
      if (this.props.authenticated) {
        if (this.props.users === null) this.props.getUsers()
      }
    }
  }

  render() {
    const { location, history, user } = this.props
    return (
      <AppBar position="absolute" style={{zIndex:10}}>
        <Toolbar>
          <Typography variant="title" color="inherit" style={{flex: 1}}>
            Uber for Tickets
          </Typography>
          {
            user &&
            <Button color="inherit"> <AccountIcon />{ user.firstName }</Button> //
          }

          {
            !this.props.authenticated > 0 &&
            <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
          }
          {
            location.pathname.indexOf('login') > 0 &&
            <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
          }
          {
            <Button color="inherit" onClick={() => history.push('/events')}>All Events</Button>
          }
          {
            this.props.authenticated &&
            <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

const mapDispatchToProps = {
  getUsers
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopBar)
)
