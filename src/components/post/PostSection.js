import React from 'react'
import PostList from './PostList'


//PostSection is a dumb component - it doesn't manage state, it only renders data
//it will become a smart component when it'll have filters (will render data according
//to the selected filters)
const PostSection = (props) => {
	const { posts } = props // const posts = props.posts
	return (
		<PostList posts={posts} {...props} />
	)
}

export default PostSection
