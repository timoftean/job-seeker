import React, { Component } from 'react'
import {List, ListItem} from 'react-mdl'
import { User } from '../../controllers/User'
import { Post } from '../../controllers/Post'
import PostItem from '../post/PostItem'


export default class NotifyStatusForJob extends Component {
	constructor(props) {
		super(props)
		this.state = {
			postStatuses: null,
			posts: [],
			user: null,
		}
		this.jobController = new Post()
		this.userController = new User()
	}
	
	async componentDidMount() {
		const user = await this.userController.getCurrentUser()
		this.setState({user})

		const postStatuses = await this.jobController.getPostsByHiredUser(user.info.uid)
		this.setState({postStatuses})

		const posts = []
		for (let p in postStatuses) {
			for (let key in postStatuses[p]) {
				let temp = {}
				temp[key] = await this.jobController.getPostById(key) 
				posts.push(temp)
			}
		}
		this.setState({posts})
	}

  render() {
  	if (!this.props.authed || !this.state.posts) return null
  	return (
    	<div>
    		<List>
    		{this.state.posts.map((elem, index) => {
    			let key
    			for (let x in elem) {
    				key = x
    			}
    			let status = ''
    			for (let y in this.state.postStatuses) {
    				let el = this.state.postStatuses[y][key][this.state.user.info.uid]
    				if (el.status) {
    					status = el.status
    				} else {
    					status = 'pending'
    				}
    			}
		  		return (<ListItem key={index}><h3>status: { status }</h3><PostItem id={elem[key].post.id} post={elem[key].post} /></ListItem>)
    		})}
    		</List>
			</div>
    )
  }
}

