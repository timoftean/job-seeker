import React, { Component } from 'react'
import {List,ListItem,} from 'react-mdl'
import PostItem from './PostItem'

const PostList = (props) => {
		const { posts } = props
		return (
			<div>
				<h1>Posts</h1>
				<List>
					{Object.keys(posts).map(key => {
						console.log("key",posts[key])
						return (
							<ListItem key={key}>
								<PostItem id={key} post={posts[key]} {...this.props}/>
							</ListItem>)
					})}
				</List>
			</div>
		)
	}
}

export default PostList

PostList.propTypes = {
	posts: PropTypes.object
}