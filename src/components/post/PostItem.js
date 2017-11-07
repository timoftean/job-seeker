import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {Card, CardTitle, CardText, CardActions, Button} from 'react-mdl'

const PostItem = (props) => {
	const { id, post } = props
	return(
		<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
			<CardTitle style={{height: '100px'}}>{post.title}</CardTitle>
			<CardText>
				{post.type === 'provider'
					?<div>Type: Offer</div>
					:<div>Type: Request</div>
				}
				<div>{post.description}</div>
			</CardText>
			<CardActions border>
				<div>
					<Link  to={{pathname: `/post/details/${id}`, props:{post,id} }} >
						<Button colored>Show details</Button>
					</Link>
				</div>
			</CardActions>
		</Card>
	)
}

export default PostItem

PostItem.propTypes = {
	post: PropTypes.object,
	id: PropTypes.string
}