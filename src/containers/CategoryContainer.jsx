import React, { Component } from 'react';
import QuarterContainer from './category-data-containers/QuarterContainer';
import YearContainer from './category-data-containers/YearContainer';
import HalfYearContainer from './category-data-containers/HalfYearContainer';
import { connect } from 'react-redux';
import moment from 'moment';

const views = {
	0: QuarterContainer,
	1: YearContainer,
	2: HalfYearContainer
};

class CategoryContainer extends Component {
	render(){
		const {
			title,
			startDate,
			endDate,
			bossFullname,
			viewType,
			data
		} = this.props;
		const DataContainer = views[viewType];
		return (
			<div className='category'>
				<div className='category__header'>
					<span
						className='category__title'
					>
						{`${title} - период(${moment(startDate).format('LL')} - ${moment(endDate).format('LL')})`}
					</span>
					<strong className='category__boss'>{bossFullname}</strong>
				</div>
				<div className='category__body'>
					{DataContainer && <DataContainer id={data} />}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return { ...state.categories[ownProps.id] };
}

export default connect(mapStateToProps)(CategoryContainer);