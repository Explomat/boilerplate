import React, { Component, PropTypes } from 'react';
import { AlertDanger, AlertInfo } from '../components/modules/alert';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { dom } from '../config';
// import cx from 'classnames';

class AppContainer extends Component {

	/*componentDidMount(){
		this._changeStyles();
	}
	
	_changeStyles(){
		const mainZoneNode = document.getElementById(dom.wtZoneMain);
		const rightZoneNode = document.getElementById(dom.wtZoneRight);
		if (mainZoneNode && rightZoneNode){
			mainZoneNode.style.marginRight = '0px';
			mainZoneNode.style.marginLeft = '0px';
			rightZoneNode.style.display = 'none';
		}
	}*/
	
	render(){
		const {
			title,
			isFetching,
			access,
			errorMessage,
			infoMessage,
			children
		} = this.props;
		return (
			<div className='app-container'>
				<div className='app-container__header'>
					<h3 className='app-container__title'>{title}</h3>
					{errorMessage &&
						<AlertDanger
							text={errorMessage}
							onClose={this.props.error.bind(this, null)}
							className='app-container__error'
						/>
					}
					{infoMessage &&
						<AlertInfo
							text={infoMessage}
							onClose={this.props.info.bind(this, null)}
							className='app-container__error'
						/>
					}
				</div>
				<div className='app-container__body'>
					{isFetching ? <h2>Запрос доступа...</h2> : access ? children : <h1>Доступ запрещен</h1>}
				</div>
				<div id={dom.portalModalId} />
			</div>
		);
	}
}

AppContainer.propTypes = {
	children: PropTypes.node,
	isFetching: PropTypes.bool,
	errorMessage: PropTypes.string,
	infoMessage: PropTypes.string
};

function mapStateToProps(state) {
	return { ...state.app };
}

export default connect(mapStateToProps, actionCreators)(AppContainer);