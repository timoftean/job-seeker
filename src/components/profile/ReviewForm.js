import React, { Component } from 'react'
import { User } from '../../controllers/User'
import { Textfield, Radio, RadioGroup } from 'react-mdl'

function setErrorMsg(error) {
  return {
    addPostError: error.message,
  }
}

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);
	const revieweeId = this.props.match.params.id;
    const { description, rating } =
      props.location.props ? props.location.props.review : ''
    
    this.state = {
      addReviewError: null,
	  revieweeId,
      description: description || '',
      rating: rating || ''
    };
    this.userController = new User();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.verifyInput()) {
      this.setState(setErrorMsg({message: "All fields must be completed!"}));
      return;
    }

    const review = {
		description: this.state.description,
		rating: this.state.rating
    };
    
	// const revieweeId = 'Pt08tSNnkFVZhswcKb9kzATZPdC3'
    this.userController.setUserReview(review, this.state.revieweeId)
		.then(() => {
		  this.props.history.push('/')
		})
		.catch(e => this.setState(setErrorMsg(e)));
	};

	verifyInput() {
		return this.state.revieweeId && this.state.description && this.state.rating
	}

	render() {
		const css = `.mdl-textfield { width: 95%; }`
		return (
		  <div className="col-sm-6 col-sm-offset-3">
			<form onSubmit={this.handleSubmit}>
			  <Textfield
				onChange={e => this.setState({description: e.target.value})}
				pattern="^[a-zA-Z0-9_ ]*$"
				error="Description must not be empty!"
				label="Description"
				style={{width: '100%'}}
				value={this.state.description}
			  />
			  <style>{css}</style>
			  <RadioGroup
				name="rating"
				value={this.state.rating}
				onChange={e => this.setState({rating: e.target.value})}>
				  <Radio value="1"> 1 </Radio>
				  <Radio value="2"> 2 </Radio>
				  <Radio value="3"> 3 </Radio>
				  <Radio value="4"> 4 </Radio>
				  <Radio value="5"> 5 </Radio>
			  </RadioGroup>
			  <div>
				<button type="submit" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Save</button>
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
