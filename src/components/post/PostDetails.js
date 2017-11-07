import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Post } from '../../controllers/Post'
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, FABButton, CardActions, Button} from 'react-mdl'

class PostDetails extends Component {
	constructor(props) {
		super(props)
		this.state={
			loaded: false
		}
		this.postController = new Post()
	}
	
	handleDelete = async (id) => {
		await this.postController.removePost(id)
		this.props.history.push('/')
	}
	
	render() {
		console.log("propsss",this.props)
		const { id, post } = this.props.location.props
		
		return(
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
						<FABButton  className="pull-right" colored mini ripple>
							X
						</FABButton>
					</div>
				</CardActions>
			</Card>
		)
	}
}

export default PostDetails

Post.propTypes = {
	post: PropTypes.object,
}
