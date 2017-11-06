import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ImageUpload from './ImageUpload'

import { Card, CardTitle, CardText, Button, CardActions, CardMenu } from 'react-mdl'

const ProfileInfos = (props) => {
	const { user } = props
	return (
		<Card shadow={0} style={{width: '400px',minHeight:'0',height:'170px', margin: 'auto'}}>
			<CardTitle style={{height: '70px'}}>
				{user.profile.firstName} {user.profile.lastName}
			</CardTitle>
			<CardText>
				<div>
					{user.profile.phone}
				</div>
			</CardText>
			<CardActions border>
				<Link to="/addPost">
					<Button colored>Add a post</Button>
				</Link>
				<ImageUpload/>
			</CardActions>
			<CardMenu >
				<Link to="/editProfile">
					<i style={{color: 'blue'}} className="material-icons">mode_edit</i>
				</Link>
			</CardMenu>
		</Card>
	)
}

export default ProfileInfos
ProfileInfos.propTypes = {
	user: PropTypes.object
}