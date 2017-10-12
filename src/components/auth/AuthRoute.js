import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, signedIn, ...rest }) => {
  const onComponentRender = props => (
    signedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
  );

  return <Route {...rest} render={onComponentRender} />;
};

function mapStateToProps(state) {
  return { signedIn: state.auth.signedIn };
}

/* Inject auth state and dispatch() into props */
export default connect(mapStateToProps)(AuthRoute);
