import constants from '../constants';
import assign from 'lodash/assign';

function isFetchingTest(state = false, action){
	const { type } = action;
	
	if (type === constants.TESTS_GET_TEST){
		return true;
	}
	return false;
}

export default function vacancy(state = {
	id: null,
	title: '',
	isFetching: true
}, action) {
	switch (action.type) {
		case constants.TESTS_GET_TEST:
		case constants.TESTS_GET_TEST_SUCCESS:
			return assign({}, state, action.response, { isFetching: isFetchingTest(state.isFetching, action) });

		default:
			return state;
	}
}

