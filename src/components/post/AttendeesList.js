import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Post } from '../../controllers/Post'
import { User } from '../../controllers/User'
import { Link } from 'react-router-dom'
import { Card, CardTitle, CardText, FABButton, CardActions, Button} from 'react-mdl'

class AttendeesList extends Component {
	constructor(props) {
		super(props)
		const { id } = this.props.match.params
		this.state={
			loaded: false,
			id,
			post: null,
      attendees: null,
			user: null
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
					loaded:true
				})
			})
	}
	
	handleDelete = async () => {
		await this.postController.removePost(this.state.id)
		this.props.history.push('/')
	}
	
	renderLoggedUserActions = () => {
		return (
			<div>
				<Link  to={{pathname: `/editPost`, props:{post:this.state.post} }} >
					<Button colored>Edit Post</Button>
				</Link>
				<FABButton onClick={this.handleDelete} className="pull-right" colored mini ripple>
					X
				</FABButton>
			</div>
		)
	}
	
	renderActions = () => {
		return (
			<div>
				{this.state.post.type==='provider'
					?<Link  to={{pathname: `/provider/hire/${this.state.id}`, props:{post:this.state.post} }} >
            <Button colored>Send hire request</Button>
          </Link>
					:<Link  to={{pathname: `/job/apply/${this.state.id}`, props:{post:this.state.post} }} >
            <Button colored>Send application request</Button>
          </Link>
				}
        <Link  to={{pathname: `/post/details/${this.state.id}`, props:{post:this.state.post} }} >
          <Button colored>Hide attendees list</Button>
        </Link>
			</div>
		)
	}
	
	render() {
		if (!this.state.loaded) return null
		return(
			<Card shadow={0} style={{width: '512px', margin: 'auto'}}>
				<CardTitle style={{height: '70px'}}>
					{this.state.post.type === "provider"
						?<span>Service I search for: </span>
						:<span>Service I can do: </span>
					}
					<span>{this.state.post.title}</span>
				</CardTitle>
				<CardText>
          Attendees: <div>
          {this.state.attendees.length != 0
            ? this.state.attendees.map(key => {
                const email = key.info.email
                return email+"; "
              })
            :<div>No attendees yet</div>
          }
          </div>

				</CardText>
				<CardActions border style={{height: '55px'}}>
					{this.state.post.userId === this.state.loggedUserId
						? this.renderLoggedUserActions()
						: this.renderActions()
					}
				</CardActions>
			</Card>
		)
	}
}

export default AttendeesList

Post.propTypes = {
	post: PropTypes.object,
}
