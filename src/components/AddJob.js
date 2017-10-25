import React, {Component} from 'react'
import {Job} from '../controllers/Job'

function setErrorMsg(error) {
  return {
    addJobError: error.message
  }
}

export default class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {addJobError: null};

    this.jobController = new Job();
  }

  verifyInput(title, description) {
    return title && description;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const jobTitle = this.title.value;
    const jobDescription = this.description.value;

    if (!this.verifyInput(jobTitle, jobDescription)) {
      this.setState(setErrorMsg({message: "The title and description cannot be empty!"}));
      return;
    }

    this.jobController.saveJob(jobTitle, jobDescription)
      .catch(e => this.setState(setErrorMsg(e)));
  };

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Add a job!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input className="form-control" ref={(title) => this.title = title} placeholder="title"/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" className="form-control" placeholder="description" ref={(d) => this.description = d}/>
          </div>
          {
            this.state.addJobError &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.addJobError}
            </div>
          }
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}
