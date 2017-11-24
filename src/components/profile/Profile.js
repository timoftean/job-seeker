import React, { Component } from 'react'
import {Tab, Tabs, List, ListItem} from 'react-mdl'
import PostList from '../post/PostList'
import EditUserProfile from './ProfileInfosForm'
import ProfileInfos from './ProfileInfos'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'
import Notification from './Notification'
import NotifyStatusForJob from './NotifyStatusForJob'

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  activeTab: 0,
      user: {},
			hasPosts:null,
			posts: null,
			loaded: false,
		}
		
		this.userController = new User()
		this.jobController = new Post()
	}
	
	async componentDidMount() {
		const user = await this.userController.getCurrentUser()
		const posts = await this.jobController.getUserPosts()
		this.setState({
			user: user,
			hasPosts: (user && user.info ? user.info.hasPosts === 1 : false),
			posts,
			loaded: true
		})
	}

	renderTab = () => {
	  switch (this.state.activeTab) {
      case 1:
        return  this.state.posts
          ?<PostList posts={this.state.posts}/>
	        :<h2>No posts yet</h2>
	    case 2:
	    	return <Notification authed={this.props.authed}/>
	    case 3:
	    	return <NotifyStatusForJob authed={this.props.authed}/>
		  default:
			  return this.state.user.profile
			    ?<ProfileInfos user={this.state.user} {...this.props} />
			    :<EditUserProfile {...this.props}/>
    }
  }
  
  setActiveTab = (tabId) => {
	  this.setState({ activeTab: tabId })
  }
  
  render () {
	  //if user is not authenticated do not show profile
	  if (!this.props.authed || !this.state.loaded) return null
    return (
      <div>
        <div className="demo-tabs">
          <Tabs activeTab={this.state.activeTab} onChange={(tabId)=>{this.setActiveTab(tabId)}} ripple>
            <Tab>Profile</Tab>
						{this.state.loaded && this.state.hasPosts !== "false"
							?<Tab>My posts</Tab>
							:null
						}
						<Tab>From your category</Tab>
						<Tab>Notifications</Tab>
          </Tabs>
          <section>
	          {this.state.loaded && this.state.user
	            ?this.renderTab()
	            :null
	          }
          </section>
        </div>
      </div>
    )
  }
}

