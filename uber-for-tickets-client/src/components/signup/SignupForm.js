import React, {PureComponent} from 'react'
import './SignupForm.css'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.state.password === this.state.confirmPassword) {
			this.props.onSubmit(this.state)
		}
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <Paper className="signup-form" style={{padding: 20}}>
  			<form onSubmit={this.handleSubmit}>
					{/* <label>
            First name
            <input type="text" name="firstName" value={
  						this.state.firstName || ''
  					} onChange={ this.handleChange } />
          </label> */}
					<TextField
						name="firstName"
						label="First name"
						type="text"
						value={this.state.firstName || ''}
						onChange={ this.handleChange }
						style={{marginRight: 20}}
					/>

					{/* <label>
            Last name
            <input type="text" name="lastName" value={
  						this.state.lastName || ''
  					} onChange={ this.handleChange } />
          </label>	 */}
					<TextField
						name="lastName"
						label="Last name"
						type="text"
						value={this.state.lastName || ''}
						onChange={ this.handleChange }
						style={{marginRight: 20}}
					/>				

  				{/* <label>
            Email
            <input type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </label> */}
					<TextField
						name="email"
						label="Email"
						type="email"
						value={this.state.email || ''}
						onChange={ this.handleChange }
						style={{marginRight: 20}}
					/>
  					
  				{/* <label>
            Password
  					<input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</label> */}
					<TextField
						name="password"
						label="Password"
						type="password"
						value={this.state.password || ''}
						onChange={ this.handleChange }
						style={{marginRight: 20}}
					/>

  				{/* <label>
            Confirm password
  					<input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label> */}
					<TextField
						name="confirmPassword"
						label="Confirm password"
						type="password"
						value={this.state.confirmPassword || ''}
						onChange={ this.handleChange }
						style={{marginRight: 20}}
					/>

  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				<Button variant="outlined" type="submit">Sign up</Button>
  			</form>
      </Paper>
		)
	}
}
