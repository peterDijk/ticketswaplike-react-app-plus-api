import React, {PureComponent} from 'react'
import './LoginForm.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

export default class LoginForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <Paper className="login-form" style={{padding: 30}}>
  			<form onSubmit={this.handleSubmit}>
					<TextField
						name="email"
						type="email"
						label="Email"
						value={this.state.email || ''}
						onChange={this.handleChange}
						style={{display: 'block'}}
						autoFocus={true}
					/>

					<TextField
						name="password"
						type="password"
						label="Password"
						value={this.state.password || ''}
						onChange={ this.handleChange }
						style={{display: 'block', marginBottom: 20}}
					/>

  				<Button variant="contained" color="secondary" type="submit">Login</Button>
  			</form>
		  </Paper>)
	}
}
