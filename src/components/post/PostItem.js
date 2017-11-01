import React from 'react'
import Link from 'react-router-dom'
import {Card, CardTitle, CardText, CardActions, Button, FABButton} from 'react-mdl'

const PostItem = (props) => {
	const { id, post, handleDelete } = props
	console.log("item",post)
	return(
		<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
			<CardTitle style={{height: '100px'}}>{post.title}</CardTitle>
			<CardText>
				{post.description}
			</CardText>
			<CardActions border>
				<div>
					<Link  to={{pathname: '/post/details/'+id, props:{post} }} >
						<Button colored>Show details</Button>
					</Link>
					<FABButton onClick={() => {handleDelete(post.id)}} className="pull-right" colored mini ripple>
						X
					</FABButton>
				</div>
			</CardActions>
		</Card>
	)
}

export default PostItem