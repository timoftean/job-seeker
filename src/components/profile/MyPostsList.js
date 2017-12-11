import React, { Component } from 'react'
import PostList from '../post/PostList'
import { Post } from '../../controllers/Post'

export default class MyPostsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      user: {},
      hasPosts:null,
      posts: null,
      loaded: false,
    }
    
    this.jobController = new Post()
  }
  
  async componentDidMount() {
    const posts = await this.jobController.getUserPosts()
    this.setState({
      posts,
      loaded: true
    })
  }
  
  render () {
    //if user is not authenticated do not show profile
    if (!this.props.authed || !this.state.loaded) return null
    return  this.state.posts
      ?<PostList posts={this.state.posts}/>
      :<h2>No posts yet</h2>

  }
}

