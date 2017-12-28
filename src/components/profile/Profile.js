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
		const reviews = await this.userController.getUserReviews()
		this.setState({
			user: user,
			hasPosts: (user && user.info ? user.info.hasPosts === 1 : false),
			posts,
			reviews,
			loaded: true
		})
	}
	
  render () {
	  //if user is not authenticated do not show profile
	  if (!this.props.authed || !this.state.loaded) return null
			console.log(this.state.reviews['-L1T1mvmQXy7uTd7Sxt7']) // what is '-L1T1mvmQXy7uTd7Sxt7' ?
			// return this.state.reviews['-L1T1mvmQXy7uTd7Sxt7'] // how to return it ??
			return this.state.user.profile
			?<ProfileInfos user={this.state.user} {...this.props} />
			:<EditUserProfile {...this.props}/>
  }
}

