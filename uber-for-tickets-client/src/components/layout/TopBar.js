import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {connect} from 'react-redux'
import AccountIcon from '@material-ui/icons/AccountBox'
import {getUser} from '../../actions/users'
import {Link} from 'react-router-dom'

class TopBar extends React.PureComponent {
  componentDidMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUser(userId(this.props.currentUser.jwt))
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authenticated !== this.props.authenticated) {
      if (this.props.authenticated) {
        if (this.props.users === null) this.props.getUser(userId(this.props.currentUser.jwt))
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
            <Button color="inherit"> <AccountIcon />{ user.firstName } {user.lastName}</Button> //
          }

          {
            !this.props.authenticated &&
            <Button color="inherit"><Link to="/login">Login</Link></Button>
          }
          {
            !this.props.authenticated &&
            <Button color="inherit"><Link to="/signup">Sign up</Link></Button>
          }
          {
            <Button color="inherit"><Link to="/events">All Events</Link></Button>
          }
          {/* {
            this.props.authenticated &&
            <Button color="inherit"><Link to="/">Add ticket</Link></Button>
          } */}
          {
            this.props.authenticated &&
            <Button color="inherit"><Link to="/logout">Log out</Link></Button>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  currentUser: state.currentUser,
  users: state.users === null ? null : state.users,
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

const mapDispatchToProps = {
  getUser
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopBar)
)