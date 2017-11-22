import React, { Component } from 'react'
import { Auth } from '../../controllers/Auth'
import { Link } from 'react-router-dom'
import { Button } from 'react-mdl'
/* eslint-disable */
function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  
  constructor(props) {
    super(props)
	  this.state = { loginMessage: null }
	  
	  const auth = new Auth()
    this.login = auth.login
    this.loginWithGoogle = auth.loginWithGoogle
    this.resetPassword = auth.resetPassword
  }
  
	handleGoogleLogin = () => {
		this.loginWithGoogle()
      .then(() => {
        this.props.history.push('/')})
			.catch(function (error) {
				alert(error);
				this.setState(error)
			});
	}
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.login(this.email.value, this.pw.value)
	    .then(() => {
        this.props.history.push('/')
	    })
      .catch((error) => {
          this.setState(setErrorMsg('Invalid username/password.'))
        })
  }
  
  resetPasswd = () => {
    this.resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }
  
  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <div className="mdl-layout-spacer"></div>
        <a
          onClick={() => this.handleGoogleLogin()}
          className="btn btn-block btn-social btn-lg btn-google">
          <i className="fa fa-google"></i>
          Sign in with Google
        </a>
        <div style={{textAlign: 'center'}}><h4>or</h4></div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage}
              <a href="javascript: void(0)" onClick={this.resetPasswd} className="alert-link">Forgot Password?</a>
            </div>
          }
          <button type="submit" className="btn btn-primary btn-md">Login</button>
          <p>Need an account?
            <Link to="/register" >
              <Button colored> Sign up.</Button>
            </Link>
          </p>
        </form>
      </div>
    )
  }
}
