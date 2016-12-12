import 'babel-polyfill';
import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { getAccess } from './actions';
import thunk from 'redux-thunk';
import App from './containers/App';
import config from './config';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

store.dispatch(getAccess());

const routes = <Route path='/' component={App} />;

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
	document.getElementById(config.dom.appId)
);