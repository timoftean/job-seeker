import React, { Component } from 'react'
import {List,ListItem,Textfield, Button} from 'react-mdl'
import Select from 'react-select'
import { Post } from '../../controllers/Post'

import PostItem from './PostItem'

export default class PostList extends Component {
  constructor(props) {
    super(props);

    let posts = [];
    for (const postKey in props.posts) {
      posts.push(this.createObject(postKey, props.posts[postKey]));
    }

    this.state = {
    	posts: posts,
    	searchKey: "",
      sortKey: "",
      ascendingSort: true
    };

    console.log(this.state.posts);
    this.postController = new Post();
    this.handleChange = this.handleChange.bind(this)
  }

  createObject = (key, post) => {
    return {
      key: key,
      price: post.price,
      description: post.description,
      numHours: post.numHours,
      category: post.category,
      location: post.location,
      timeInterval: post.timeInterval,
      title: post.title,
      userId: post.userId,
      type: post.type
    };
  };

  async handleChange (e) {
    this.setState({searchKey: e.target.value});
    let posts = await this.postController.getAllPosts();
    let key = this.state.searchKey;
    let filteredPosts = [];
    for (const postKey in posts) {
      if (posts[postKey].title.toLowerCase().includes(key.toLowerCase()) ||
          posts[postKey].description.toLowerCase().includes(key.toLowerCase()))
        filteredPosts.push(this.createObject(postKey, posts[postKey]));
    }

    console.log(filteredPosts);
    this.setState({posts: filteredPosts})
  }

  handleSortKeyChanged = (sortKey) => {
    this.setState( {sortKey});
  };

  handleOrderChanged = (ascendingSort) => {
    this.setState( {ascendingSort} );
  };

  sort = () => {
    if (this.state.sortKey.value === undefined) {
      return;
    }

    let posts = this.state.posts;
    posts.sort((a, b) => {
      if (this.state.sortKey.value === 'price') {
        return parseInt(a.price) - parseInt(b.price);
      }
      return parseInt(a.numHours) - parseInt(b.numHours);
    });

    if (this.state.ascendingSort.value === false) {
      posts.reverse();
    }

    this.setState({posts: posts});
  };

	render() {
		return (
		<div>
			<Textfield
				onChange={this.handleChange}
				label="Search"
				style={{width: '100%'}}
			/>
      <div style={{width: 200}}>
      <p>
        Sort by:
      </p>
      <Select
        clearable={false}
        name="sort-key"
        value={this.state.sortKey.value}
        onChange={this.handleSortKeyChanged}
        options={[
          { value: 'price', label: 'Price' },
          { value: 'hours', label: 'Num. hours' },
        ]}
      />
      <Select
        style={{marginTop: 5, marginBottom: 5}}
        clearable={false}
        name="order-select"
        value={this.state.ascendingSort.value}
        onChange={this.handleOrderChanged}
        options={[
          { value: true, label: 'Ascending' },
          { value: false, label: 'Descending' },
        ]}
      />
      </div>
      <Button raised colored onClick={this.sort}>Sort</Button>
      <List>
				{this.state.posts
					? this.state.posts.map(post => {
							return (
								<ListItem key={post.key}>
									<PostItem id={post.key} post={post} {...this.props}/>
								</ListItem>)
						})
					:<h3>No posts yet</h3>
				}
				
			</List>
		</div>
		)
	}
}
