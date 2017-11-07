import React, { Component } from 'react'
import {Tab, Tabs} from 'react-mdl'
import PostList from '../post/PostList'
import EditUserProfile from './EditProfileInfos'
import ProfileInfos from './ProfileInfos'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'


export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  activeTab: 0,
      user: {},
			hasPosts:false,
			posts: null,
			loaded: false
		}
		
		this.userController = new User()
		this.jobController = new Post()
	}
	
	async componentDidMount() {
		const user = await this.userController.getCurrentUser()
		const posts = await this.jobController.getUserPosts()
		this.setState({
			user: user,
			hasPosts: (user.info.hasPosts === 1),
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
		  default:
			  return this.state.user.profile
			    ?<ProfileInfos user={this.state.user} {...this.props} />
			    :(<EditUserProfile {...this.props}/>)
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
						{this.state.loaded && this.state.hasPosts
							?<Tab>My posts</Tab>
							:null
						}
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

