import React, { Component } from 'react'
import { Button } from 'react-mdl'
import { Auth } from '../controllers/Auth'

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
        <h1>ProviderForm</h1>
        <form onSubmit={this.handleSubmit}>
          <Button ripple>Button</Button>
		  
          <button type="submit" className="btn btn-primary">ProviderForm</button>
        </form>
      </div>
    )
  }
}

// categorie(momentan doar un input, mai incolo punem o lista predefinita de categorii ), locatie, 
// nr de h/sapt, disponibilitate-interval orar si eventual o descriere