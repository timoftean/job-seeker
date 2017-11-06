import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ImageUpload from './ImageUpload'
import { Card, CardTitle, CardText, Button, CardActions, CardMenu } from 'react-mdl'
import { User } from '../../controllers/User'

class ProfileInfos extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			pictureUrl: null
		}
		this.userController = new User()
	}
	
	componentDidMount() {
		this.userController.getPictureUrl()
			.then(pictureUrl => { this.setState({pictureUrl, loaded: true})})
			.catch((error) => {
				switch (error.code) {
					case 'storage/object_not_found':
						console.log("File does not exists")
						this.setState({loaded: true})
						break;
					case 'storage/unauthorized':
						console.log("Unauthorized")
						break;
				}
			})
	}
	
	getStyle = () => {
		return this.state.pictureUrl
		?{
				color: '#fff',
				height: '200px',
				background: `url(${this.state.pictureUrl}) center / cover`
			}
		:{
				color: '#fff',
				height: '70px',
			}
	}
	
	render() {
		if (!this.state.loaded) return null
		
		const { user } = this.props
		return (
			<Card shadow={0} style={{width: '400px',minHeight:'0', margin: 'auto'}}>
				<CardTitle style={this.getStyle()}>
					<div>
						{user.profile.firstName} {user.profile.lastName}
					</div>
				</CardTitle>
				<CardText>
					<div>
						{user.profile.phone}
					</div>
				</CardText>
				<CardActions border style={{height: '50px'}}>
					<Link to="/addPost">
						<Button colored>Add a post</Button>
					</Link>
				</CardActions>
				<CardMenu >
					<Link to="/editProfile">
						<i style={{color: 'blue'}} className="material-icons">mode_edit</i>
					</Link>
				</CardMenu>
			</Card>
		)
	}
}

export default ProfileInfos
ProfileInfos.propTypes = {
	user: PropTypes.object
}