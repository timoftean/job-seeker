import React, {Component} from 'react'
import {Job} from '../../controllers/Job'
import {Textfield} from 'react-mdl'

function setErrorMsg(error) {
  return {
    addJobError: error.message,
  }
}

export default class AddJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addJobError: null,
      title: '',
      description: '',
      category: '',
      location: '',
      numHours: '',
      timeInterval: '',
      price: ''
    };
    this.jobController = new Job();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.verifyInput()) {
      this.setState(setErrorMsg({message: "All fields must be completed!"}));
      return;
    }

    const title = this.state.title;
    const description = this.state.description;
    const category = this.state.category;
    const location = this.state.location;
    const numHours = this.state.numHours;
    const timeInterval = this.state.timeInterval;
    const price = this.state.price;

    this.jobController.saveJob(title, description, category, location, numHours, timeInterval, price)
      .then(() => {
        this.props.history.push('/profile')
      })
      .catch(e => this.setState(setErrorMsg(e)));
  };

  verifyInput() {
    return this.state.title && this.state.description && this.state.category && this.state.location
        && this.state.numHours && this.state.timeInterval && this.state.price;
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1>Add a job!</h1>
        <form onSubmit={this.handleSubmit}>
          <Textfield
            onChange={e => this.setState({title: e.target.value})}
            pattern="([^\s]*)"
            error="Title must not be empty!"
            label="Title"
            style={{width: '200px'}}
          />
          <Textfield
            onChange={e => this.setState({description: e.target.value})}
            pattern="([^\s]*)"
            error="Description must not be empty!"
            label="Description"
            rows={3}
            style={{width: '200px'}}
          />
          <Textfield
            onChange={e => this.setState({category: e.target.value})}
            pattern="([^\s]*)"
            error="Category must not be empty!"
            label="Category"
            style={{width: '200px'}}
          />
          <Textfield
            onChange={e => this.setState({location: e.target.value})}
            pattern="([^\s]*)"
            error="Location must not be empty!"
            label="Location"
            style={{width: '200px'}}
          />
          <Textfield
            onChange={e => this.setState({numHours: e.target.value})}
            pattern="[0-9]*(\.[0-9]+)?"
            error="Invalid number of hours!"
            label="Num. hours/week"
            style={{width: '200px'}}
          />
          <Textfield
            onChange={e => this.setState({timeInterval: e.target.value})}
            pattern="[0-2][0-9]:[0-5][0-9](\s)*-(\s)*[0-2][0-9]:[0-5][0-9]"
            error="Invalid time interval!"
            label="Time interval (hh:mm - hh:mm)"
            style={{width: '200px'}}
          />
          <Textfield
            onChange={e => this.setState({price: e.target.value})}
            pattern="[0-9]+"
            error="Invalid price!"
            label="Price"
            style={{width: '200px'}}
          />

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {
          this.state.addJobError &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
            <span className="sr-only">Error:</span>
            &nbsp;{this.state.addJobError}
          </div>
        }
      </div>
    )
  }
}
