import React from 'react'
import {List,ListItem,} from 'react-mdl'
import PropTypes from 'prop-types'

import PostItem from './PostItem'

const PostList = (props) => {
	const { posts } = props
	return (
		<div>
			<List>
				{posts
					? Object.keys(posts).map(key => {
							return (
								<ListItem key={key}>
									<PostItem id={key} post={posts[key]} {...props}/>
								</ListItem>)
						})
					:<h3>No posts yet</h3>
				}
				
			</List>
		</div>
	)
}

export default PostList

PostList.propTypes = {
	posts: PropTypes.object
}
