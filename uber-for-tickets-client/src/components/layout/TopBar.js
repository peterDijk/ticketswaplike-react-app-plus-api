import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {withRouter} from 'react-router'
import {userId} from '../../jwt'
import {isAdmin} from '../../jwt'
import {connect} from 'react-redux'
import AccountIcon from '@material-ui/icons/AccountBox'
import {getUser, logout} from '../../actions/users'
import {Link} from 'react-router-dom'
import LoginPage from '../login/LoginPage'


class TopBar extends React.PureComponent {
  state = {
    loginMode : false
  }

  onLoginClick = () => {
    this.setState({
      loginMode: true
    })
  }

  componentDidMount() {
    if (this.props.authenticated) {
      if (this.props.users === null) this.props.getUser(userId(this.props.currentUser.jwt))
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authenticated !== this.props.authenticated) {
      if (this.props.authenticated) {
        this.setState({
          loginMode: false
        })
      }
      if (this.props.authenticated) {
        if (this.props.users === null) this.props.getUser(userId(this.props.currentUser.jwt))
      }
    }
  }

  render() {
    const { user } = this.props
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
            this.props.isAdmin === true && <Typography style={{color:'white'}}>(admin)</Typography>
          }

          {
            !this.props.authenticated &&
            <Button color="inherit" onClick={this.onLoginClick}>Login</Button>
          }
          {
            !this.props.authenticated &&
            <Link to="/signup"><Button color="inherit">Sign up</Button></Link>
          }
          {
            <Link to="/events"><Button color="inherit">All Events</Button></Link>
          }

          {
            this.props.authenticated &&
            <Button color="inherit" onClick={() => this.props.logout()}>Log out</Button>
          }
        </Toolbar>
        {this.state.loginMode === true &&
          <div style={{backgroundColor: 'rgba(221, 221, 221, 0.3)',position: 'absolute', top: 75, right: 40}}><LoginPage /></div>
        }
      </AppBar>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  currentUser: state.currentUser,
  users: state.users === null ? null : state.users,
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)],
  isAdmin: state.currentUser && isAdmin(state.currentUser.jwt)
})

const mapDispatchToProps = {
  getUser,
  logout
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TopBar)
)
