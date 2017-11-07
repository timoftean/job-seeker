import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, FABButton, CardActions} from 'react-mdl'
//Post is a component which render all data of a Post entity
//It should be shown after the user clicks "Show details" on a post in the PostSection
const Post = (props) => {
	const { post, handleDelete } = props
		return(
			//make a card with ALL fields of Post entity
			<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
				<CardTitle style={{height: '100px'}}>{post.title}</CardTitle>
				<CardText>
					{post.description}
				</CardText>
				<CardActions border>
					<div>
						<Link  to={{pathname: `/post/details/${id}`, props:{post} }} >
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

export default Post

Post.propTypes = {
	post: PropTypes.object,
}