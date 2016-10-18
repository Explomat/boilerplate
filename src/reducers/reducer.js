import constants from '../constants/constants';
import merge from 'lodash/merge';

function setFailure(state, error, errorKey, fetchingKey){
	let newState = merge({}, state, {[errorKey]: error});
	delete newState[fetchingKey];
	return newState;
}

function setSuccess(state, newState, errorKey, fetchingKey){
	let _newState = merge({}, state, newState);
	delete _newState[errorKey];
	delete _newState[fetchingKey];
	return _newState;
}

export default function(state = {}, action) {
	switch (action.type) {
		case constants.GET_STATE:
			return merge({}, state, { fetching: true });
		case constants.GET_STATE_SUCCESS:
			return setSuccess(state, action.response, "error", "fetching");
		case constants.GET_STATE_FAILURE:
			return setFailure(state, action.error, "error", "fetching");
		default:
			return state;
	}
}