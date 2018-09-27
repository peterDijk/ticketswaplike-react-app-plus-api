import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../actions/users'
import SignupForm from './SignupForm'
import {Redirect} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.firstName, data.lastName, data.email, data.password)
	}

	render() {
		if (this.props.signup.success) return (
			<Redirect to="/" />
		)

		return (
			<div style={{margin: 'auto', width: '40vw', position: 'relative', top: 100}}>
				<Typography variant="headline" style={{marginBottom: 20}}>Sign up</Typography>

				<SignupForm onSubmit={this.handleSubmit} />

				<p style={{color:'red'}}>{ this.props.signup.error && this.props.signup.error.message}</p>
				{this.props.signup.error && 
				this.props.signup.error.errors.map(error => {
					return (
						Object.values(error.constraints).map(value => <p style={{color:'red'}}>{value}</p>)
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, {postSignup: signup})(SignupPage)
