import React, { Component } from 'react'
import {List, ListItem} from 'react-mdl'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'
import PostItem from '../post/PostItem'


export default class ListFromAreaOfInterest extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allposts: null,
			matchingPosts: null,
			userCategories: null,
		}
		this.jobController = new Post()
		this.userController = new User()
	}
	
	async componentDidMount() {
		let posts
		await this.jobController.getActivePosts().then(data => posts = data)
		let postsArray = Object.keys(posts).map(function(key) {
  		return {id: key, post: posts[key]}
		});
		this.setState({allposts : postsArray})
		
		const userCategories = await this.userController.getCurrentUser()
		this.setState({userCategories : userCategories.profile.categories})
		
		let matchingPosts = this.state.allposts.filter((index) => {
			for (let cat in this.state.userCategories) {
				if (index.post.category === this.state.userCategories[cat].label) {
					return index;
				}
			}
			return null
		}); 
		this.setState({matchingPosts})
	}

  render() {
	  if (!this.props.authed || !this.state.matchingPosts) return null
    return (
    	<div>	
    		<List>
    			{this.state.matchingPosts.map(function(elem, index) {
    				return (<ListItem key={elem.id}><PostItem id={elem.id} post={elem.post} /></ListItem>)
    			})}
    		</List>
			</div>
    )
  }
}

