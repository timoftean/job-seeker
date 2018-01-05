import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-mdl'

const ReviewItem = (props) => {
	const { description, rating } = props
	return(
		<Card  shadow={0} style={{width: '512px', margin: 'auto'}}>
			<div>Description: {description}</div>
			<div>Rating: {rating}</div>
		</Card>
	)
}

export default ReviewItem

ReviewItem.propTypes = {
	description: PropTypes.string,
	rating: PropTypes.string
}
