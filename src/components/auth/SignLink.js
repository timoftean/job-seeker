import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouterType } from '../../propTypes';

import { signOut } from './actions';

const actionCreators = { signOut };

class SignLink extends React.Component {

  signOut() {

    this.props.dispatch(actionCreators.signOut(success => {
        this.context.router.replace('/');
    }));
  }

  render() {
    return(!this.props.signedIn ? <Link to="/signin">Sign In</Link> : <a onClick={ e => this.signOut() }>Sign Out</a>)
  }

}

SignLink.contextTypes = {
  router: RouterType.isRequired
};

SignLink.propTypes = {
 signedIn: React.PropTypes.bool.isRequired,
 dispatch: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { signedIn: state.auth.signedIn };
}

/* Inject auth state and a dispatch() wrapper into props */
export default connect(mapStateToProps)(SignLink);
