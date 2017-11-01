import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import AddJob from './protected/AddJob'
import Providers from './Providers'
import ProviderForm from './protected/ProviderForm'
import Profile from './protected/Profile'
import EditUserProfile from './protected/EditUserProfile'
import PostSection from './post/PostSection'

import { Post } from '../controllers/Post'
import { Auth } from '../controllers/Auth'
import { firebaseAuth } from '../config/constants'
import { Spinner } from 'react-mdl'

const PrivateRoute  = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props}/> }
    />
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
	  this.state = {
		  authed: false,
		  loading: true,
      posts:{}
	  }
	  this.postController = new Post()
  }
  
  async componentDidMount () {
	  const posts = await this.postController.getAllPosts()
    console.log("p",posts)
	  this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          posts
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          posts
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    const auth = new Auth()
    const logout = auth.logout

    return this.state.loading === true
      ? <Spinner />
      : (
      <BrowserRouter >
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Job Seeker</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Post</Link>
                </li>
                <li>
                  <Link to="/providers" className="navbar-brand">Providers</Link>
                </li>
                <li>
                  <Link to="/profile" className="navbar-brand">Profile</Link>
                </li>
                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => logout() }
                        className="navbar-brand">Logout</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Login</Link>
                        <Link to="/register" className="navbar-brand">Register</Link>
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                <Route path='/' exact
                       render={(props) => <PostSection {...props} posts={this.state.posts} />}/>
                <PublicRoute path='/providers' component={Providers} />
                <PublicRoute path='/login' component={Login} />
                <PublicRoute path='/register' component={Register} />
                {/*<PrivateRoute authed={this.state.authed} path='/profile' component={Profile} />*/}
				        <PrivateRoute authed={this.state.authed} path='/ProviderForm' component={ProviderForm} />
                <PrivateRoute authed={this.state.authed} path='/add-post' component={AddJob} />
                {/*<PrivateRoute authed={this.state.authed} path='/editProfile' component={EditUserProfile} />*/}
                <Route render={() => <h3>No Match</h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
