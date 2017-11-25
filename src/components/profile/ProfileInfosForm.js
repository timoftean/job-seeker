import React, {Component} from 'react'
import {Textfield} from 'react-mdl'
import {User} from '../../controllers/User'
import ImageUpload from './ImageUpload'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
			phone: '',
			categories: [],
			selectedCategories: [],
      value: []
		}
		this.userController = new User()
        //this.handleSelectChange = this.handleSelectChange.bind(this)

    }

	async componentDidMount() {
		//fetch data using await (the code will run as a being sync)
		const user = await this.userController.getCurrentUser().then(user => user)
    const { firstName, lastName , phone} = user.profile ? user.profile : ''
		const categories = await this.userController.getCategories().then(data => data)
    let categoriesArray = []
		
		//map categories object to an array of objects as the Select need to receive
		Object.keys(categories).map( key => {
			let obj = {}
			obj['value'] = key
			obj['label'] = categories[key]
			categoriesArray.push( obj )
		})
		
    this.setState({
      firstName: firstName || '',
      lastName: lastName || '',
      phone: phone || '',
      categories : categoriesArray || [],
      loaded: true
    })
	}

	 handleSelectChange = (value) => {
     console.log('Selected: ', value);
		 this.setState({selectedCategories: value, value})
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
			lastName: this.state.lastName,
			categories: this.state.selectedCategories
		}
		const self = this
		this.userController.saveUserProfile(userProfile)
			.then(() => {
				self.props.history.push('/')
			})
			.catch(e => this.setState(setErrorMsg(e)));
	};
	
	verifyInput() {
		return this.state.firstName && this.state.lastName && this.state.phone && this.state.selectedCategories
	}
	
	render () {
		if(!this.state.loaded) return null;

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
						<Select
							multi={true}
							name="form-field-name"
							value={this.state.value}
							label='Select preferred categories'
							options={this.state.categories}
							onChange={this.handleSelectChange}
						/>
					</div>

					<div>
						<label>Upload a profile picture</label>
						<ImageUpload/>
					</div>

					{
						this.state.registerError &&
						<div className="alert alert-danger" role="alert">
							<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
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
