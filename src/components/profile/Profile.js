import React, { Component } from 'react'
import EditUserProfile from './ProfileInfosForm'
import ProfileInfos from './ProfileInfos'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'

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
	
  render () {
	  //if user is not authenticated do not show profile
	  if (!this.props.authed || !this.state.loaded) return null
			return this.state.user.profile
			?<ProfileInfos user={this.state.user} {...this.props} />
			:<EditUserProfile {...this.props}/>
  }
}

