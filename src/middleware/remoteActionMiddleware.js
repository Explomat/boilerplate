import {get, post} from '../utils/ajax';
import camelcase from 'camelcase';
import config from '../config';
import {assign, omit} from 'lodash'

function requestFromAction(action, params, isCache){
	const httpType = action.meta.httpType;

	if (httpType === 'POST'){
		return post(config.url.createPath(params), JSON.stringify(params), isCache);
	}
	else {
		return get(config.url.createPath(params), isCache);
	}
}

export default store => next => action => {
	if (action.meta && action.meta.remote) {
		const serverName = action.meta.serverName;
		const isCache = action.meta.cache;
		let params = assign({server_name: serverName, action_name: camelcase(action.type)}, omit(action, ['meta', 'type']));

	    requestFromAction(action, params, isCache)
	    .then(data => {
	    	const _action = {type: action.type + '_SUCCESS'};
	    	if (data === ''){
	    		return next(assign(_action, params));
	    	}

	    	let _data = JSON.parse(data);
	    	if (_data.error){
	    		throw new Error(_data.error);
	    	}

	    	let newAction = assign({
	    		type: action.type + '_SUCCESS',
	    		response: _data,
	    	}, params)
	    	return next(newAction);
	    }, e => {
	    	let newAction = {
	    		type: action.type + '_FAILURE',
	    		error: e.message
	    	}
	    	return next(newAction);
	    }).catch( e => {
	    	let newAction = {
	    		type: action.type + '_FAILURE',
	    		error: e.message
	    	}
	    	return next(newAction);
	    })
	}
	return next(action);
}