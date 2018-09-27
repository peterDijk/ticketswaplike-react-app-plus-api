import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {login} from '../../actions/users'
import LoginForm from './LoginForm'
import {withRouter} from 'react-router'

class LoginPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.login(data.email, data.password)
	}

	render() {

		return (
			<div>
				<LoginForm onSubmit={this.handleSubmit} />

        { this.props.error && 
          <span style={{color:'red'}}>{this.props.error}</span> }
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		currentUser: state.currentUser,
    error: state.login.error
	}
}

export default withRouter(
	connect(mapStateToProps, {login})(LoginPage)
)
