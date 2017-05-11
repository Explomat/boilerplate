import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AppContainer from './containers/AppContainer';
import AssessmentContainer from './containers/AssessmentContainer';
import { dom } from './config';
import moment from 'moment';
moment.locale('ru');

import 'classlist-polyfill';
import 'babel-polyfill';
import './styles';

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [thunk, createLogger()];

const store = createStore(
  reducers,
  applyMiddleware(...middleware)
);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<AssessmentContainer />
		</AppContainer>
	</Provider>,
	document.getElementById(dom.appId)
);