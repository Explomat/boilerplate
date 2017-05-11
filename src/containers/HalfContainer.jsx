import React, { Component } from 'react';
import CategoryContainer from './CategoryContainer';
import moment from 'moment';
import { connect } from 'react-redux';

class HalfContainer extends Component {
	render(){
		const {
			title,
			startDate,
			endDate,
			categories
		} = this.props;
		return (
			<div className='half'>
				<div className='half__title'>
					{`${title} (${moment(startDate).format('LL')} - ${moment(endDate).format('LL')})`}
				</div>
				{categories.map((c, index) => {
					return <CategoryContainer key={index} id={c}/>;
				})}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return { ...state.halves[ownProps.id] };
}

export default connect(mapStateToProps)(HalfContainer);