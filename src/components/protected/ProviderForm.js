import React, { Component } from 'react'
import { Provider } from '../../controllers/Provider'
import { Textfield } from 'react-mdl'

function setErrorMsg(error) {
	return {
		addProviderError: error.message,
	}
}

export default class ProviderForm extends Component {
  constructor(props) {
    super(props)
	  this.state = {
    	addProviderError: null,
		  category: '',
		  location: '',
		  noHours: '',
		  availability: '',
		  description: ''
	  }
	  
	  this.providerController = new Provider()
  }
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		if (!this.verifyInput()) {
			this.setState(setErrorMsg({message: "All fields must be completed!"}));
			return;
		}
		
		const provider = {
			category: this.state.category,
			location: this.state.location,
			noHours: this.state.noHours,
			availability: this.state.availability,
			description: this.state.description
		}
		
		this.providerController.saveProvider(provider)
			.then(() => {
				this.props.history.push('/profile')
			})
			.catch(e => this.setState(setErrorMsg(e)));
	};
	
	verifyInput() {
		return this.state.category && this.state.location && this.state.noHours && this.state.availability && this.state.description
	}
	
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Provider Form</h1>
	      <form onSubmit={this.handleSubmit}>
				  <Textfield
						onChange={e => this.setState({category: e.target.value})}
						label="Category"
						style={{width: '200px'}}
				  />
				  <Textfield
						onChange={e => this.setState({location: e.target.value})}
						label="Location"
						style={{width: '200px'}}
				  />
				  <Textfield
				    onChange={e => this.setState({noHours: e.target.value})}
				    pattern="[0-9]*(\.[0-9]+)?"
				    error="Invalid input!"
				    label="No. hours/week"
				    style={{width: '200px'}}
				  />
				  <Textfield
					  onChange={e => this.setState({availability: e.target.value})}
				    pattern="[0-2][0-9]:[0-5][0-9] - [0-2][0-9]:[0-5][0-9]"
				    error="Invalid input!"
				    label="Time slot (13:00 - 22:00)"
				    style={{width: '200px'}}
				  />
				  <Textfield
					  onChange={e => this.setState({description: e.target.value})}
						label="Description"
						style={{width: '400px'}}
				  />
	        <button type="submit" className="btn btn-primary">Save</button>
        </form>
	      {
		      this.state.addProviderError
			    ?(<div className="alert alert-danger" role="alert">
				      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
				      <span className="sr-only">Error:</span>
				      &nbsp;{this.state.addProviderError}
		        </div>
			      )
			     :null
	      }
      </div>
    )
  }
}
