import React, { Component } from 'react'
import { List, ListItem } from 'react-mdl'
import EditUserProfile from './ProfileInfosForm'
import ProfileInfos from './ProfileInfos'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'
import ReviewItem from "./ReviewItem";

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  activeTab: 0,
      user: {},
			hasPosts:null,
			posts: null,
			loaded: false,
		}
		
		this.userController = new User()
		this.jobController = new Post()
	}
	
	async componentDidMount() {
		const user = await this.userController.getCurrentUser()
		const posts = await this.jobController.getUserPosts()
		const reviews = await this.userController.getUserReviews()
		this.setState({
			user: user,
			hasPosts: (user && user.info ? user.info.hasPosts === 1 : false),
			posts,
			reviews,
			loaded: true
		})
	}
	
	render () {
		// if user is not authenticated do not show profile
		if (!this.props.authed || !this.state.loaded) return null
		
		return (
			<div>
				<div>
					{this.state.user.profile
						?<ProfileInfos user={this.state.user} {...this.props} />
						:<EditUserProfile {...this.props}/>
					}
				</div>
				<div>
					<List>
                    {Object.keys(this.state.reviews).map((reviewKey) => {
							return (
                                <ListItem key={reviewKey}>
                                    <ReviewItem description={this.state.reviews[reviewKey].description} 
												rating={this.state.reviews[reviewKey].rating}
												{...this.props}/>
                                </ListItem>
							)
					})}
					</List>
				</div>
			</div>
		)
	}
}
