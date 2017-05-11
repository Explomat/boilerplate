import React, { Component } from 'react';
import PaContainer from './PaContainer';
import { connect } from 'react-redux';

class YearContainer extends Component {
	render(){
		const {
			pas
		} = this.props;
		return (
			<div className='year'>
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
	return { ...state.categoryData[id] };
}


export default connect(mapStateToProps)(YearContainer);