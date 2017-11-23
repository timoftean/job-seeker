import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Post } from '../../controllers/Post'
import { User } from '../../controllers/User'
import { Card, CardTitle, CardText, CardActions, Button} from 'react-mdl'

class AttendeesList extends Component {
	constructor(props) {
		super(props)
		const { id } = this.props.match.params
		this.state={
			loaded: false,
			id,
			post: null,
      attendees: null,
			user: null,
			statuses: null,
		}
		this.postController = new Post()
		this.userController = new User()
	}
	
	componentDidMount() {
		this.postController.getPostById(this.state.id)
			.then(res => {
				this.setState({
					user: res.user,
					post: Object.assign(res.post,{id: this.state.id}),
          attendees: Object.assign(res.attendees,{id: this.state.id}),
					loggedUserId: res.loggedInUser,
					loaded:true,
					statuses: res.statuses
				})
			})
	}
	
	handleAccept(user) {
		this.postController.acceptUserToPost(this.state.post, user)
	}

	handleReject(user) {
		this.postController.rejectUserToPost(this.state.post, user)
	}

	renderUser(user) {
		let firstName
		let lastName
		user.profile ? firstName = user.profile.firstName : firstName = ''
		user.profile ? lastName = user.profile.lastName : lastName = ''			

		const { uid, email } = user.info

		let status = this.state.statuses.filter(function(index) {
			for (let x in index) {
				if (x === uid) {
					return index
				}
			}
		})[0][uid];

		return (
			<Card key={ uid } shadow={0} style={{width: '512px', minHeight:'70px', margin: 'auto'}}>
				<CardTitle style={{height: '50px'}}>
					<h5>Name: { firstName } { lastName } </h5>
				</CardTitle>
				<CardText>
					<label>email: &nbsp;</label>
					{ email }
					<br/>
					<label> status: &nbsp;</label>
					{ status }
				</CardText>
				<CardActions border>
					<Button colored onClick={() => this.handleAccept(user)}>Accept</Button>
					<Button colored onClick={() => this.handleReject(user)} className="pull-right">Decline</Button>
				</CardActions>
			</Card>
    )
	}
	
	render() {
		if (!this.state.loaded) return null
		const { post, loggedUserId, attendees } = this.state
		return(
			<div>
        {post.userId === loggedUserId
          ? <Card style={{width: '700px', margin: 'auto'}}>
						<CardText>
							<div>
              {attendees.length !== 0
                ? <div>
									<h5>For the post <b>{ post.title }</b> you received requests from the following users</h5>
									{attendees.map( user => {
										return this.renderUser(user)
									})}
								</div>
                :<h4>You did not receive any requests</h4>
              }
						</div>
						</CardText>
					</Card>
          : <h1>ACCESS DENIED</h1>
        }
			</div>
		)
	}
}

export default AttendeesList

Post.propTypes = {
	post: PropTypes.object,
}
