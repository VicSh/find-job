import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import reducer from './reducer';

import AuthRoute from './component/authroute/authroute'
import DashBoard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'

import "./config";
import './index.css';
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
  // window.__REDUX_DEVTOOLS_EXTENSION__() ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

// __REDUX_DEVTOOLS_EXTENSION__
// window.devToolsExtension ? window.devToolsExtension() : () => {}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/bossinfo" component={BossInfo}/>
          <Route path="/geniusinfo" component={GeniusInfo}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/chat/:user" component={Chat}/>
          <Route component={DashBoard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
