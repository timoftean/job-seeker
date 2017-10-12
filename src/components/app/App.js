import React from 'react';
import { Route } from 'react-router-dom';

import Errors from '../errors';
import { AuthRoute, SignIn } from '../auth';
import Navigation from '../navigation';
import { CommentList, AddComment } from '../comment';

// <Miss component={Errors} /> == <Route component={Errors} /> ?

const App = () => (
  <div>
    <div>
      <Navigation />
      <div className="container">
        <Route exact path="/" component={CommentList} />
        <AuthRoute path="/add" component={AddComment} />
        <Route path="/signin" component={SignIn} />
        <Route component={Errors} />
      </div>
    </div>
  </div>
);

export default App;
