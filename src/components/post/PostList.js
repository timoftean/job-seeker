import React, { Component } from 'react'
import {List,ListItem,} from 'react-mdl'
import PostItem from './PostItem'
import { Post } from '../../controllers/Post'

class PostList extends Component {
	constructor(props) {
		super(props)
		this.postController = new Post()
	}
	
	renderContent = () => {
		const { posts } = this.props
		
		return (
			<List>
				{Object.keys(posts).map(key => {
					console.log("key",posts[key])
					return (
						<ListItem key={key}>
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
				{ this.renderContent() }
			</div>
		)
	}
}

export default PostList