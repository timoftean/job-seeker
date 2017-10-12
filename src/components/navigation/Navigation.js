import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouterType } from '../../propTypes';

import { SignLink } from '../auth';

class Navigation extends React.Component {

  renderAdminMenu() {
    if (!this.props.auth.roles.some(r => r === 'ROLE_ADMIN')) {
      // return null;
    }

    return (
      <li className="dropdown">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Admin <span className="caret" /></a>
        <ul className="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider" />
          <li><a href="#">Separated link</a></li>
        </ul>
      </li>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link to="/" className="navbar-brand">spring-react-boilerplate</Link>
          </div>
          <div id="navbar" className="collapse navbar-right navbar-collapse">
            <ul className="nav navbar-nav">
              { this.renderAdminMenu() }
              <li><Link to="/">Home</Link></li>
              <li><Link to="/add">Add Comment</Link></li>
              <li><SignLink/></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.contextTypes = {
  router: RouterType.isRequired
};

Navigation.propTypes = {
  auth: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

/* Inject auth state and a dispatch() wrapper into props */
export default connect(state => ({ auth: state.auth }))(Navigation);
