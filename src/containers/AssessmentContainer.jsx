import React, { Component } from 'react';
import HalfContainer from './HalfContainer';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';

class AssessmentContainer extends Component {
	
	componentDidMount(){
		this.props.getAssessment();
	}
	
	render(){
		const { isFetching, halves } = this.props;
		return (
			<div className='assessment-container'>
				{isFetching ?
					<div className='overlay-loading overlay-loading--show' /> :
					<div className='assessment'>
						{halves.map(h => {
							return <HalfContainer key={h.id} {...h}/>;
						})}
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		halves: Object.values(state.halves)
	};
}

export default connect(mapStateToProps, actionCreators)(AssessmentContainer);
