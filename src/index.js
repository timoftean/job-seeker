/* React, browser and server rendering functions. We need the
 * first import, even though it isn't explicitly referenced
 * in this file, in order to avoid runtime errors.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

// State management with redux
import { Provider } from 'react-redux';

// Routing with react-router
import { HashRouter } from 'react-router-dom';

import App from './components/app';

import createStore from './store';

// Client-side rendering. We rehydrate the Redux store and plugin it into the page render
if (typeof window !== 'undefined') {
  const store = createStore(window.__INITIAL_STATE__);

  const app = (
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );

  ReactDOM.render(app, document.getElementById('root'));
}
