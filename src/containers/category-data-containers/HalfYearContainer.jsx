import React, { Component } from 'react';
import PaContainer from './PaContainer';
import MonthContainer from './MonthContainer';
//import Test from '../../components/Test';
import { AlertWarning } from '../../components/modules/alert';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';

class HalfYearContainer extends Component {
	
	constructor(props){
		super(props);
		
		this.handleToggleDisplayMonths = this.handleToggleDisplayMonths.bind(this);
		this.state = {
			isDisplayMonths: false
		};
	}
	
	handleToggleDisplayMonths(){
		const { isDisplayMonths } = this.state;
		this.setState({ isDisplayMonths: !isDisplayMonths });
	}
	
	_renderMonths(){
		const { isDisplayMonths } = this.state;
		if (!isDisplayMonths){
			return null;
		}
		
		const { months } = this.props;
		const monthsLen = months ? months.length : 0;
		return (
			monthsLen > 0 ?
				<div className='half-year__months-container'>
					<div className='half-year__months'>
						{months.map(m =>
							<MonthContainer key={m} id={m} />
						)}
					</div>
				</div> :
				<AlertWarning className='half-year__no-months' text='Нет данных' isClose={false} />
		);
	}
	
	render(){
		const { pas/*, tests, activateTest*/ } = this.props;
		const { isDisplayMonths } = this.state;
		return (
			<div className='half-year clearfix'>
				<div className='half-year__year'>
					<div className='pas'>
						{pas.map(p =>
							<PaContainer
								key={p}
								id={p}
							/>
						)}
					</div>
					{/*tests && tests.length > 0 && <div className='half-year__tests'>
						<div>Тестирование</div>
						{tests.map((t, index) => <Test key={index} {...t} onActivate={activateTest}/>)}
					</div>*/}
					
				</div>
				{isDisplayMonths ?
					<span
						className='half-year__display-months'
						onClick={this.handleToggleDisplayMonths}
					>
						Скрыть
						<i className='icon-up-open' />
					</span> :
					<span
						className='half-year__display-months'
						onClick={this.handleToggleDisplayMonths}
					>
						Показать по месяцам
						<i className='icon-down-open' />
					</span>
				}
				{this._renderMonths()}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const { id } = ownProps;
	const hyState = state.categoryData[id];
	const tests = hyState.tests.map(t => state.tests[t]);
	return {
		...hyState,
		tests
	};
}

export default connect(mapStateToProps, actionCreators)(HalfYearContainer);