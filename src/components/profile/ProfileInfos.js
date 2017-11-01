import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText, Button, IconButton, Menu, MenuItem, CardActions} from 'react-mdl'

const ProfileInfos = (props) => {
	const { user } = props
	return (
		<Card shadow={0} style={{width: '500px', margin: 'auto'}}>
			<CardTitle style={{height: '100px'}}>
				Profile
				<div style={{position: 'relative'}}>
					<IconButton name="more_vert" id="demo-menu-lower-left"/>
					<Menu target="demo-menu-lower-left">
						<MenuItem>
							<Link to="/editProfile">Edit profile</Link>
						</MenuItem>
					</Menu>
				</div>
			</CardTitle>
			<CardText>
				<div>
					<span>{user.profile.firstName} {user.profile.lastName}</span>
				</div>
				<div>
					<span>{user.profile.location}</span>
				</div>
			</CardText>
			<CardActions border>
				<Link to="/addPost">
					<Button colored>Add a post</Button>
				</Link>
			</CardActions>
		</Card>
	)
}

export default ProfileInfos
ProfileInfos.propTypes = {
	user: PropTypes.object
}