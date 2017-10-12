import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouterType } from '../../propTypes';

import { saveComment, } from './actions';

const actionCreators = { saveComment };

class AddComment extends React.Component {

  saveComment(event) {
    event.preventDefault();

    const author = this.authorInput;
    const content = this.contentInput;

    this.props.dispatch(actionCreators.saveComment(author.value.trim(), content.value.trim()));

    author.value = '';
    content.value = '';

    this.context.router.replace('/');
  }

  render() {
    return (
      <form onSubmit={ e => this.saveComment(e) }>
        <h1>Add Comment</h1>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input id="author" className="form-control" type="text" size={50} ref={el => { this.authorInput = el; }} />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input id="comment" className="form-control" type="text" size={50} ref={el => { this.contentInput = el; }} />
        </div>
        <Link to="/" className="btn btn-primary">Back</Link>
        {' '}
        <button className="btn btn-success" type="submit">Submit</button>
      </form>);
  }
}

AddComment.contextTypes = {
  router: RouterType.isRequired
};

AddComment.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}

/* Inject dispatch() but no state into props */
export default connect()(AddComment);
