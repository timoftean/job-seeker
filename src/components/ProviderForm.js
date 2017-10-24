import React, { Component } from 'react'
import { Auth } from '../controllers/Auth'
import { Textfield } from 'react-mdl'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class ProviderForm extends Component {
  constructor(props) {
    super(props)
	  this.state = { registerError: null }
    
	  this.authenticate = new Auth().authenticate
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.authenticate(this.email.value, this.pw.value)
      .catch(e => this.setState(setErrorMsg(e)))
  }
  
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Provider Form</h1>
        <form onSubmit={this.handleSubmit}>
		  <Textfield
			onChange={() => {}}
			label="Category"
			style={{width: '200px'}}
		  />
		  <Textfield
			onChange={() => {}}
			label="Location"
			style={{width: '200px'}}
		  />
		  <Textfield
		    onChange={() => {}}
		    pattern="[0-9]*(\.[0-9]+)?"
		    error="Invalid input!"
		    label="No. hours/week"
		    style={{width: '200px'}}
		  />
		  <Textfield
		    onChange={() => {}}
		    pattern="[0-2][0-9]:[0-5][0-9] - [0-2][0-9]:[0-5][0-9]"
		    error="Invalid input!"
		    label="Time slot (13:00 - 22:00)"
		    style={{width: '200px'}}
		  />
		  <Textfield
			onChange={() => {}}
			label="Description"
			style={{width: '200px'}}
		  />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

// categorie(momentan doar un input, mai incolo punem o lista predefinita de categorii ), locatie, 
// nr de h/sapt, disponibilitate-interval orar si eventual o descriere
