import React from 'react'
import {List,ListItem,} from 'react-mdl'
import PropTypes from 'prop-types'

import PostItem from './PostItem'

const PostList = (props) => {
	const { posts } = props
	console.log("postlist",posts)
	return (
		<div>
			<h1>Posts</h1>
			<List>
				{Object.keys(posts).map(key => {
					console.log("key",posts[key], key)
					return (
						<ListItem key={key}>
							<PostItem id={key} post={posts[key]} {...props}/>
						</ListItem>)
				})}
			</List>
		</div>
	)
}

export default PostList

PostList.propTypes = {
	posts: PropTypes.object
}