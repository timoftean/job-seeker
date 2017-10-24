import React, { Component } from 'react'
import { Auth } from '../../controllers/Auth'
import { Textfield } from 'react-mdl'

export default class ProviderForm extends Component {
  constructor(props) {
    super(props)
	  this.state = { registerError: null }
    
	  this.authenticate = new Auth().authenticate
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    console.log("toDO: ", this.category, this.location, this.noHours, this.availability, this.description);
  }
  
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Provider Form</h1>
        <form onSubmit={this.handleSubmit}>
		  <Textfield
		    ref={(category) => this.category = category}
			onChange={() => {}}
			label="Category"
			style={{width: '200px'}}
		  />
		  <Textfield
		    ref={(location) => this.location = location}
			onChange={() => {}}
			label="Location"
			style={{width: '200px'}}
		  />
		  <Textfield
		    ref={(noHours) => this.noHours = noHours}
		    onChange={() => {}}
		    pattern="[0-9]*(\.[0-9]+)?"
		    error="Invalid input!"
		    label="No. hours/week"
		    style={{width: '200px'}}
		  />
		  <Textfield
		    ref={(availability) => this.availability = availability}
		    onChange={() => {}}
		    pattern="[0-2][0-9]:[0-5][0-9] - [0-2][0-9]:[0-5][0-9]"
		    error="Invalid input!"
		    label="Time slot (13:00 - 22:00)"
		    style={{width: '200px'}}
		  />
		  <Textfield 
		    ref={(description) => this.description = description}
			onChange={() => {}}
			label="Description"
			style={{width: '400px'}}
		  />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
