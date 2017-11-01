import React, { Component } from 'react'
import {List,ListItem,} from 'react-mdl'
import PostItem from './PostItem'
import { Post } from '../../controllers/Post'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.state={
			jobs: props.jobs
		}
		this.postController = new Post()
	}
	
	handleDelete = async (key) => {
		return this.postController.removePost(key)
			.then(() => {
				console.log("Remove succeeded.")
				this.props.history.push('/profile')
			})
			.catch((error) => {
				console.log("Remove failed: " + error.message)
			});
	}
	
	renderContent = () => {
		const { posts } = this.props
		return (
			<List>
				{Object.keys(posts).map(key => {
					return (
						<ListItem>
							<PostItem id={key} post={posts[key]} {...this.props}/>
						</ListItem>)
					})
				}
			</List>
		)
	}
					
	render () {
		console.log("postList",this.props.posts)
		return (
			<div>
				<h1>Posts</h1>
				{ this.renderContent }
			</div>
		)
	}
}

export default PostList