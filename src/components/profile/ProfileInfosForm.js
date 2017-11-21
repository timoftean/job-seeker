import React, { Component } from 'react'
import { Textfield } from 'react-mdl'
import { User } from '../../controllers/User'
import ImageUpload from './ImageUpload'

function setErrorMsg(error) {
	return {
		registerError: error.message
	}
}

 class EditProfileInfos extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			registerError: null,
			firstName: '',
			lastName: '',
			phone: ''
		}
		this.userController = new User()
	}
	
	componentDidMount() {
		this.userController.getCurrentUser().then(user => {
			console.log("User",user)
			const { firstName, lastName , phone } = user.profile ? user.profile : ''
			this.setState({
				firstName: firstName || '',
				lastName: lastName || '',
				phone: phone || '',
				loaded: true
			})
		})
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		if (!this.verifyInput()) {
			this.setState(setErrorMsg({message: "All fields must be completed!"}));
			return;
		}
		
		const userProfile = {
			phone: this.state.phone,
			firstName: this.state.firstName,
			lastName: this.state.lastName
		}
		const self = this
		this.userController.saveUserProfile(userProfile)
			.then(() => {
				self.props.history.push('/')
			})
			.catch(e => this.setState(setErrorMsg(e)));
	};
	
	verifyInput() {
		return this.state.firstName && this.state.lastName && this.state.phone
	}
	
	render () {
		if(!this.state.loaded) return null
		
		return (
			<div className="col-sm-6 col-sm-offset-3">
				<h1>Profile</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<Textfield
							onChange={e => this.setState({firstName: e.target.value})}
							pattern="([^\s]*)"
							error="First name must not be empty!"
							label="First Name"
							style={{width: '200px'}}
							value={this.state.firstName}
						/>
					</div>
					<div>
						<Textfield
							onChange={e => this.setState({lastName: e.target.value})}
							pattern="([^\s]*)"
							error="Last name must not be empty!"
							label="Last name"
							style={{width: '200px'}}
							value={this.state.lastName}
						/>
					</div>
					<div>
						<Textfield
							onChange={e => this.setState({phone: e.target.value})}
							pattern="[0-9]*(\.[0-9]+)?"
							error="Phone must not be empty!"
							label="phone: e.g. 0755203368"
							style={{width: '200px'}}
							value={this.state.phone}
						/>
					</div>
					<div>
						<label>Upload a profile picture</label>
						<ImageUpload/>
					</div>
					
					{
						this.state.registerError &&
						<div className="alert alert-danger" role="alert">
							<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							<span className="sr-only">Error:</span>
							&nbsp;{this.state.registerError}
						</div>
					}
					<div>
						<button type="submit" className="btn btn-primary">Save</button>
					</div>
				</form>
			</div>
		)
	}
}

export default EditProfileInfos
