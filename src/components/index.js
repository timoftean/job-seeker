import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import PostForm from './post/PostForm'
import Profile from './profile/Profile'
import ReviewForm from './profile/ReviewForm'
import EditUserProfile from './profile/ProfileInfosForm'
import PostSection from './post/PostSection'
import PostDetails from './post/PostDetails'
import AttendForm from './post/AttendForm'
import AttendeesList from './post/AttendeesList'
import MyPostsList from './profile/MyPostsList'
import ListFromAreaOfInterest from './profile/ListFromAreaOfInterest'
import NotifyStatusForJob from './profile/NotifyStatusForJob'
import Notification from './profile/Notification'
import { Post } from '../controllers/Post'
import { Auth } from '../controllers/Auth'
import { firebaseAuth } from '../config/constants'
import { Spinner, Footer, FooterSection, FooterLinkList, Layout, Header, Navigation, Badge, IconButton, Menu, MenuItem, Tooltip, Icon } from 'react-mdl'
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
      notificationCount: ''
	  }
	  this.postController = new Post()
    this.auth = new Auth()
  }
  
  async componentDidMount () {
	  const posts = await this.postController.getActivePosts();
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
    this.postController.getNotificationsForUserCount().then((data) => {
      this.setState({notificationCount: data})
    })
  }
  
  componentWillUnmount () {
    this.removeListener()
  }

  updateCount () {
    console.log("FUUUCK")
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
		  <PrivateRoute authed={authed} {...this.props} path='/reviewForm/:id' component={ReviewForm} />
          <PrivateRoute authed={authed} {...this.props} path='/profile' component={Profile} />
          <PrivateRoute authed={authed} {...this.props} path='/notifications' component={Notification} />
          <PrivateRoute authed={authed} {...this.props} path='/myPostsList' component={MyPostsList} />
          <PrivateRoute authed={authed} {...this.props} path='/favouritesCategories' component={ListFromAreaOfInterest} />
          <PrivateRoute authed={authed} {...this.props} path='/statusForJob' component={NotifyStatusForJob} />
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
  
  renderAuthedMenu = () => {
    const { logout } = this.auth
    return (
      <div>
        <MenuItem><Link to="/Profile" className="mdl-button--primary">Profile</Link></MenuItem>
        <MenuItem><Link to="/myPostsList" className="mdl-button--primary">My Posts</Link></MenuItem>
        <MenuItem><Link to="/statusForJob" className="mdl-button--primary">From My Category</Link></MenuItem>
        <MenuItem><Link to="/favouritesCategories" className="mdl-button--primary">Favourite Categories</Link></MenuItem>
        <MenuItem><Link to="/notifications" className="mdl-button--primary">Notifications</Link></MenuItem>
        <MenuItem>
          <a>
            <button
              style={{border: 'none', background: 'transparent'}}
              onClick={() => logout() }
              className="mdl-button mdl-button--accent">Logout</button>
          </a>
        </MenuItem>
      </div>
    )
  }
  
  renderNav = () => {
    const { authed } = this.state
    return (
      <div>
        <Layout>
          <Header waterfall title="Job Seeker">
            <Navigation>
              {authed
                ? <span>
                    <span>
                      <Link to="/addPost" className="mdl-button mdl-button--accent">
                        <Tooltip label="Add Post">
                          <Badge>
                            <Icon name="add" />
                          </Badge>
                        </Tooltip>
                      </Link>
                    </span>
                  <span>
                    <Link to="/notifications" className="mdl-button mdl-button--accent">
                      <Tooltip label="Notifications">
                        <Badge text={this.state.notificationCount} overlap>
                          <Icon name='notifications' />
                        </Badge>
                      </Tooltip>
                    </Link>
                  </span>
                </span>
                :null
              }
              <span>
                <Link to="/" className="mdl-button mdl-button--accent">
                  <Tooltip label="Home">
                    <Icon name="home" />
                  </Tooltip>
                </Link>
              </span>
              <span>
                <Badge>
                  <IconButton name="account_box" id="menu-lower-right" className="mdl-button mdl-button--accent"/>
                </Badge>
                <Menu target="menu-lower-right" align="right">
                  {
                    authed
                      ? this.renderAuthedMenu()
                      : <div>
                        <span><Link to="/login" className="mdl-button mdl-button--accent">Login</Link></span>
                        <span><Link to="/register" className="mdl-button mdl-button--accent">Register</Link></span>
                      </div>
                      
                  }
                </Menu>
              </span>

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
            <a href="/">Home</a>
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
          <div style={{background: 'url(./background2.jpg) center center', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'}}>
            { this.renderNav() }
            <div className="container" style={{minHeight: '800px'}}>
              { this.renderRoutes() }
            </div>
            { this.renderFooter() }
          </div>
        </BrowserRouter> )
  }
}
