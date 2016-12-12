import React, { PropTypes } from 'react';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

import Alert from '../components/modules/alert';
import Button from '../components/modules/button';
import ButtonTabs from '../components/modules/button-tabs';
import Checkbox from '../components/modules/checkbox';
import ComposeLabel from '../components/modules/compose-label';
import Dropdown from '../components/modules/dropdown';
import DropdownIcon from '../components/modules/dropdown-icon';
import Dropinfo from '../components/modules/dropinfo';
import Info from '../components/modules/info';
import InputCalendar from '../components/modules/input-calendar';
import InputMoment from '../components/modules/input-moment';
import LiveSearch from '../components/modules/live-search';
import Menu from '../components/modules/menu';
import Message from '../components/modules/message';
import Modal from '../components/modules/modal';
import Panel from '../components/modules/panel';
import Portal from '../components/modules/portal';
import RelativePortal from '../components/modules/relative-portal';
import SearchBar from '../components/modules/search-bar';
import SelectItems from '../components/modules/select-items';
import SelectOneItem from '../components/modules/select-one-item';
import SelectTree from '../components/modules/select-tree';

import TextLabel from '../components/modules/text-label';
import TextOverflow from '../components/modules/text-overflow';
import ToggleButton from '../components/modules/toggle-button';
import Tooltip from '../components/modules/tooltip';
import Tree from '../components/modules/tree';

const App = ({ ...props }) => {
	const { fetching, error, children } = props;
	
	return (
		<div>
			
			{fetching ? <h2>Loading...</h2> :
				error ? <h2>{error}</h2> : children
			}
		</div>
	);
};

App.propTypes = {
	children: PropTypes.node,
	fetching: PropTypes.bool,
	error: PropTypes.string
};

function mapStateToProps(state) {
	return {
		...state
	};
}

export default connect(mapStateToProps, actionCreators)(App);