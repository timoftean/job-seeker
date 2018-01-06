import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-mdl'

const ReviewItem = (props) => {
	const { description, rating } = props
	return(
		<Card  shadow={0} style={{opacity: 0.6, width: '512px',minHeight:'50px', margin: 'auto'}}>
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
