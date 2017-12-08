import React, { Component } from 'react'
import {List, ListItem} from 'react-mdl'
import { Post } from '../../controllers/Post'
import PostItem from '../post/PostItem'


export default class Notification extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allposts: null,
			userposts: null,
			matchingPosts: null
		}
		this.jobController = new Post()
	}
	
	async componentDidMount() {
		let posts
		await this.jobController.getAllPosts().then(data => posts = data)
		let postsArray = Object.keys(posts).map(function(key) {
  		return {id: key, post: posts[key]}
		});
		this.setState({allposts : postsArray})

		let userposts
		let userPostsArray

		await this.jobController.getUserPosts().then(data => userposts = data)
		if (userposts) {
				userPostsArray = Object.keys(userposts).map(function(key) {
  			return userposts[key]
			});
			this.setState({userposts : userPostsArray})	
		} else {
			userposts = []
		}
		
		let matchingPosts = []
		for (var a in postsArray) {
			for (var u in userPostsArray) {
				if (postsArray[a].post.category === userPostsArray[u].category && postsArray[a].post.userId !== userPostsArray[u].userId) {
					matchingPosts.push(postsArray[a])
				}
			}
		}
		this.setState({matchingPosts})
		
		let oldNr = localStorage.getItem("matchCount")
		if (matchingPosts.length > oldNr)
			this.notifyChange(matchingPosts.length - oldNr + " more posts have added!")
		
		localStorage.setItem("matchCount",matchingPosts.length)
	}


	notifyChange(text) {
		window.Notification.requestPermission().then(function(result) {
			var n = new window.Notification(text);
  		setTimeout(n.close.bind(n), 5000); 
		});
	}

  render() {
	  if (!this.props.authed || !this.state.matchingPosts) return null
    return (
    	<div>
				<List>
					{ this.state.matchingPosts.map(function(item, i){
		  			return (<ListItem key={i}><PostItem id={item.id} post={item.post} /></ListItem>)
					})}
				</List>
			</div>
    )
  }
}

