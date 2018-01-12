import React, { Component } from 'react'
import {List, ListItem, Card, CardTitle, CardText, CardActions, Button} from 'react-mdl'
import { Post } from '../../controllers/Post'
import PostItem from '../post/PostItem'
import {db} from '../../config/constants'

export default class Notification extends Component {
	constructor(props) {
		super(props)
		this.state = {
			notifications: []
		}
		this.jobController = new Post()
	}
	
	async componentDidMount() {
		const notifications = await this.jobController.getNotificationsForUser()
		this.setState({notifications})
		console.log(this.props)
	}


	notifyChange(text) {
		window.Notification.requestPermission().then(function(result) {
			var n = new window.Notification(text);
  		setTimeout(n.close.bind(n), 5000); 
		});
	}

	async handleSeenPress(post) {
		let notifRef = db.ref('/notifications/' + post.key + '/seen').set(true)
		const notifications = await this.jobController.getNotificationsForUser()
		this.setState({notifications})
	}

  render() {
  	if (!this.props.authed || !this.state.notifications) return null
    return (
    	<div>
    		<List>
			{ this.state.notifications.map((item, i) => {
		  		return (
		  			<ListItem>
		  			<Card shadow={5} style={{width: '512px', margin: 'auto'}} className={item.notification.seen ? "seenBackground" : ""}>
    				<CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>
    					{item.notification.job.title}
    				</CardTitle>
    				<CardText>
    					{"Status: " + item.notification.jobStatus}
    				</CardText>
    				<CardActions border>
        				<Button colored onClick={() => this.handleSeenPress(item)}>Mark as read</Button>
    				</CardActions>
    				</Card>
    				</ListItem>
		  				)
					})}
			</List>
		</div>
    )
  }
}

