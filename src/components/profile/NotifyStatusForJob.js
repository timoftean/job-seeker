import React, { Component } from 'react'
import {Tab, Tabs, List, ListItem} from 'react-mdl'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'
import PostItem from '../post/PostItem'


export default class Notification extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allposts: null,
		}
		this.jobController = new Post()
		this.userController = new User()
	}
	
	async componentDidMount() {
		let posts
		await this.jobController.getAllPosts().then(data => posts = data)
		let postsArray = Object.keys(posts).map(function(key) {
  		return {id: key, post: posts[key]}
		});
		this.setState({allposts : postsArray})

		console.log(this.jobController.getPostsByHiredUser())
	}

  render() {
	  if (!this.props.authed || !this.state.allposts) return null
    return (
    	<div>
			</div>
    )
  }
}

