import React, { Component } from 'react'
import {List,ListItem,Textfield} from 'react-mdl'
import { Post } from '../../controllers/Post'

import PostItem from './PostItem'

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	posts: props.posts
    }
	  this.postController = new Post()
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange (e) {
    this.setState({searchKey: e.target.value})
    let posts = await this.postController.getAllPosts()
    let key = this.state.searchKey
    let mainPosts = {}
    let secondaryPosts = {}
    for (var x in posts) {
      if (posts[x].title.toLowerCase().includes(key.toLowerCase()))
        mainPosts[x] = posts[x]
      else if (posts[x].description.toLowerCase().includes(key.toLowerCase()))
        secondaryPosts[x] = posts[x]
    }
    let filtered = Object.assign({}, mainPosts, secondaryPosts)
    this.setState({posts: filtered})
  }

	render() {
		console.log(this.state)
		return (
		<div>
			<Textfield
				onChange={this.handleChange}
				label="Search"
				style={{width: '100%'}}
			/>
			<List>
				{this.state.posts
					? Object.keys(this.state.posts).map(key => {
							return (
								<ListItem key={key}>
									<PostItem id={key} post={this.state.posts[key]} {...this.props}/>
								</ListItem>)
						})
					:<h3>No posts yet</h3>
				}
				
			</List>
		</div>
		)
	}
}