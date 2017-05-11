import React, { Component } from 'react';
import PaContainer from './PaContainer';
import { connect } from 'react-redux';

class MonthContainer extends Component {
	render(){
		const {
			pas
		} = this.props;
		return (
			<div className='month'>
				<div className='pas'>
					{pas.map((p, index) =>
						<PaContainer
							key={index}
							id={p}
						/>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const { id } = ownProps;
	return { ...state.months[id] };
}


export default connect(mapStateToProps)(MonthContainer);