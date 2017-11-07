import React, { Component } from 'react'
import { Post } from '../../controllers/Post'
import { Textfield, Radio, RadioGroup } from 'react-mdl'

function setErrorMsg(error) {
  return {
    addPostError: error.message,
  }
}

export default class AddPost extends Component {
  constructor(props) {
    super(props);
    const { id, title, description, category, location, numHours, timeInterval, price, type } =
      props.location.props ? props.location.props.post : ''
    
    this.state = {
      addPostError: null,
      id: id || '',
      title: title || '',
      description: description || '',
      category: category || '',
      location: location || '',
      numHours: numHours || '',
      timeInterval: timeInterval || '',
      price: price ||  '',
      type: type || ''
    };
    this.postController = new Post();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.verifyInput()) {
      this.setState(setErrorMsg({message: "All fields must be completed!"}));
      return;
    }

    const post = {
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      location: this.state.location,
      numHours: this.state.numHours,
      timeInterval: this.state.timeInterval,
      price: this.state.price,
      type: this.state.type
    };
    
    //if id exists, it means the post is edited, otherwise it`s added
    if (this.state.id) {
      this.postController.editPost(this.state.id, post)
	      .then(() => {
		      this.props.history.push('/')
	      })
	      .catch(e => this.setState(setErrorMsg(e)));
    } else {
	    this.postController.savePost(post)
		    .then(() => {
			    this.props.history.push('/')
		    })
		    .catch(e => this.setState(setErrorMsg(e)));
    }
  };

  verifyInput() {
    return this.state.title && this.state.description && this.state.category && this.state.location
        && this.state.numHours && this.state.timeInterval && this.state.price && this.state.type
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <RadioGroup
            name="type"
            value={this.state.type}
            onChange={e => this.setState({type: e.target.value})}>
              <Radio value="provider" ripple> I offer </Radio>
              <Radio value="job"> I search </Radio>
          </RadioGroup>
          <Textfield
            onChange={e => this.setState({title: e.target.value})}
            pattern="([^\s]*)"
            error="Title must not be empty!"
            label="Title"
            style={{width: '200px'}}
            value={this.state.title}
          />
          <Textfield
            onChange={e => this.setState({description: e.target.value})}
            pattern="^[a-zA-Z0-9_ ]*$"
            error="Description must not be empty!"
            label="Description"
            style={{width: '200px'}}
            value={this.state.description}
          />
          <Textfield
            onChange={e => this.setState({category: e.target.value})}
            pattern="([^\s]*)"
            error="Category must not be empty!"
            label="Category"
            style={{width: '200px'}}
            value={this.state.category}
          />
          <Textfield
            onChange={e => this.setState({location: e.target.value})}
            pattern="([^\s]*[^\s])"
            error="Location must not be empty!"
            label="Location"
            style={{width: '200px'}}
            value={this.state.location}
          />
          <Textfield
            onChange={e => this.setState({numHours: e.target.value})}
            pattern="[0-9]*(\.[0-9]+)?"
            error="Invalid number of hours!"
            label="No. hours/week"
            style={{width: '200px'}}
            value={this.state.numHours}
          />
          <Textfield
            onChange={e => this.setState({timeInterval: e.target.value})}
            pattern="[0-2][0-9]:[0-5][0-9](\s)*-(\s)*[0-2][0-9]:[0-5][0-9]"
            error="Invalid time interval!"
            label="Interval(hh:mm-hh:mm)"
            style={{width: '200px'}}
            value={this.state.timeInterval}
          />
          <Textfield
            onChange={e => this.setState({price: e.target.value})}
            pattern="[0-9]+"
            error="Invalid price!"
            label="Price"
            style={{width: '200px'}}
            value={this.state.price}
          />
          <div>
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
        {
          this.state.addPostError &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.addPostError}
          </div>
        }
      </div>
    )
  }
}
