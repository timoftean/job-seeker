import React, { Component } from 'react'
import { Textfield } from 'react-mdl'
import { User } from '../../controllers/User'

function setErrorMsg(error) {
	return {
		registerError: error.message
	}
}

export default class EditUserProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			registerError: null,
			firstName: '',
			lastName: '',
			location: ''
		}
		this.userController = new User()
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		if (!this.verifyInput()) {
			this.setState(setErrorMsg({message: "All fields must be completed!"}));
			return;
		}
		
		const userProfile = {
			location: this.state.location,
			firstName: this.state.firstName,
			lastName: this.state.lastName
		}
		
		this.userController.saveUserProfile(userProfile)
			.then(() => {
				console.log("props",this.props)
				this.props.history.push('/profile')
			})
			.catch(e => this.setState(setErrorMsg(e)));
	};
	
	verifyInput() {
		console.log(this.state.firstName , this.state.lastName ,this.state.location)
		return this.state.firstName && this.state.lastName && this.state.location
	}
	
	render () {
		return (
			<div className="col-sm-6 col-sm-offset-3">
				<h1>Profile</h1>
				<form onSubmit={this.handleSubmit}>
					<Textfield
						onChange={e => this.setState({firstName: e.target.value})}
						pattern="([^\s]*)"
						error="First name must not be empty!"
						label="First Name"
						style={{width: '200px'}}
					/>
					<Textfield
						onChange={e => this.setState({lastName: e.target.value})}
						pattern="([^\s]*)"
						error="Last name must not be empty!"
						label="Last name"
						style={{width: '200px'}}
					/>
					<Textfield
						onChange={e => this.setState({location: e.target.value})}
						pattern="([^\s]*)"
						error="Location must not be empty!"
						label="Location: e.g. Campia Turzii"
						style={{width: '200px'}}
					/>
					{
						this.state.registerError &&
						<div className="alert alert-danger" role="alert">
							<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span className="sr-only">Error:</span>
							&nbsp;{this.state.registerError}
						</div>
					}
					<button type="submit" className="btn btn-primary">Save</button>
				</form>
			</div>
		)
	}
}
