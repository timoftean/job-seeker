import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import PostForm from './post/PostForm'
import Profile from './profile/Profile'
import EditUserProfile from './profile/ProfileInfosForm'
import PostSection from './post/PostSection'
import PostDetails from './post/PostDetails'
import AttendForm from './post/AttendForm'
import AttendeesList from './post/AttendeesList'

import { Post } from '../controllers/Post'
import { Auth } from '../controllers/Auth'
import { firebaseAuth } from '../config/constants'
import { Spinner, Footer, FooterSection, FooterLinkList, Layout, Header, Navigation } from 'react-mdl'
import UserPublicProfile from "./profile/UserPublicProfile";

const PrivateRoute  = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} authed={authed}/>
        : <Redirect to={{pathname: '/login', props:props ,state: {from: props.location}}} />}
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
      posts:{},
	  }
	  this.postController = new Post()
  }
  
  async componentDidMount () {
	  const posts = await this.postController.getAllPosts()
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
  
  renderRoutes = () => {
    const { authed } = this.state
    
    return (
      <div className="row" style={{marginTop:'100px'}}>
        <Switch>
          <Route path='/' exact
                 render={(props) => <PostSection {...props} posts={this.state.posts} />}/>
          <PublicRoute path='/login' component={Login} />
          <PublicRoute path='/register' component={Register} />
          <PublicRoute authed={authed} {...this.props} path='/post/details/:id' component={PostDetails} />
          <PublicRoute authed={authed} {...this.props} path='/user/profile/:id' component={UserPublicProfile} />
          <PrivateRoute authed={authed} {...this.props} path='/profile' component={Profile} />
          <PrivateRoute authed={authed} {...this.props} path='/addPost' component={PostForm} />
          <PrivateRoute authed={authed} {...this.props} path='/editProfile' component={EditUserProfile} />
          <PrivateRoute authed={authed} {...this.props} path='/editPost' component={PostForm} />
          <PrivateRoute authed={authed} {...this.props} path='/provider/hire/:id' component={AttendForm} />
          <PrivateRoute authed={authed} {...this.props} path='/posts/attendeesList/:id' component={AttendeesList} />
          <PrivateRoute authed={authed} {...this.props} path='/job/apply/:id' component={AttendForm} />
          <Route render={() => <h3>No Match</h3>} />
        </Switch>
      </div>
    )
  }
  
  renderNav = () => {
    const auth = new Auth()
    const { logout } = auth
    const { authed } = this.state
    
    return (
      <div>
        <Layout >
          <Header waterfall title="Job Seeker">
            <Navigation>
              {authed
                ? <a>
                  <Link to="/addPost" className="mdl-button mdl-js-ripple-effect mdl-button--accent">Add Post</Link>
                </a>
                :null
              }
              <a>
                <Link to="/" className="mdl-button mdl-js-ripple-effect mdl-button--accent">Posts</Link>
              </a>
              {authed
                ? <a>
                  <Link to="/profile" className="mdl-button mdl-js-ripple-effect mdl-button--accent">Profile</Link>
                </a>
                :null
              }
              {authed
                ? <a><button
                  style={{border: 'none', background: 'transparent'}}
                  onClick={() => logout() }
                  className="mdl-button mdl-js-ripple-effect mdl-button--accent">Logout</button></a>
                : <span>
                  <a><Link to="/login" className="mdl-button mdl-js-ripple-effect mdl-button--accent">Login</Link></a>
                  <a><Link to="/register" className="mdl-button mdl-js-ripple-effect mdl-button--accent">Register</Link></a>
                </span>}
            </Navigation>
          </Header>
        </Layout>
      </div>
      
    )
  }
  
  renderFooter = () => {
    return (
      <Footer size="mini">
        <FooterSection type="left">
          <FooterLinkList>
            <a href="/">© 2017 Job Seeker</a>
            <a href="/addPost">Add Post</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    )
  }
  
  render() {
    return this.state.loading === true
      ? <Spinner />
      : (<BrowserRouter >
            <div>
              { this.renderNav() }
              <div className="container" style={{minHeight: '700px'}}>
                { this.renderRoutes() }
              </div>
              { this.renderFooter() }
            </div>
          </BrowserRouter> )
  }
}
