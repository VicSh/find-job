import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import App from './App';

import reducer from './reducer';

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : () => {}
))

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
