import React, {Component} from 'react'
import {Textfield} from 'react-mdl'
import {User} from '../../controllers/User'
import ImageUpload from './ImageUpload'
import Select from 'react-select';
import {Option} from "react-mdl-selectfield";

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
            categories: []
		}
		this.userController = new User()
	}

     async componentDidMount() {
		this.userController.getCurrentUser().then(user => {
			const { firstName, lastName , phone , categories } = user.profile ? user.profile : ''
			this.setState({
				firstName: firstName || '',
				lastName: lastName || '',
				phone: phone || '',
                categories : categories || [],
				loaded: true
			})
		});

        let categories;
        await this.userController.getCategories().then(data => categories = data)
        categories = Object.keys(categories).map(function(key) {
            return categories[key]
        });
        this.setState({categories})
	}

     handleSelectChange(e) {
	    //this.state.categories.push(e);
	    //this.setState({category: e})
         console.log('Selected: ', e);
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
			categories: this.state.categories
		}
		const self = this
		this.userController.saveUserProfile(userProfile)
			.then(() => {
				self.props.history.push('/')
			})
			.catch(e => this.setState(setErrorMsg(e)));
	};
	
	verifyInput() {
		return this.state.firstName && this.state.lastName && this.state.phone && this.state.categories
	}



	render () {
		if(!this.state.loaded) return null;

        // var Select = require('react-select');

        var options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];
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
                    {/*<Select*/}
                        {/*name="form-field-name"*/}
                        {/*label={'Select preferred categories'}*/}
                        {/*value="one"*/}
                        {/*options={this.state.categories}*/}
                        {/*onChange={this.handleSelectChange}*/}
                    {/*/>*/}
					<Select label={'Select preferred categories'} value="one" options={this.state.category} onChange={this.handleSelectChange} style={{width: '49%'}}>
                        {this.state.categories.map((cat, idx) => {return <Option value={cat} key={idx} style={{width: '49%'}}>{cat}</Option>})}
					</Select>
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
