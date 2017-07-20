import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './style/info.styl';

class Info extends React.Component {

	constructor(props){
		super(props);
		this.statuses = { info: 'info', error: 'error', done: 'done' };
	}

	_createMarkup(markup) {
		return { __html: markup };
	}

	render() {
		if (!this.props.isShow) {
			return null;
		}

		const status = this.props.status;
		const infoIconClasses = cx({
			'info__icon': true,
			'info__icon--error': status === this.statuses.error,
			'info__icon--info': status === this.statuses.info,
			'info__icon--done': status === this.statuses.done
		});
		const iconClasses = cx({
			'icon-ban': status === this.statuses.error,
			'icon-exclamation-circle': status === this.statuses.info,
			'icon-check-circle': status === this.statuses.done
		});
		const markup = this._createMarkup(this.props.message);
		return (
			<div className='info'>
				<div className='info__modal-box'>
					<div className='info__content'>
						<div className='info__body clearfix'>
							<span className={infoIconClasses}>
								<i className={iconClasses} />
							</span>
							<div className='info__message' dangerouslySetInnerHTML={markup} />
							<button onClick={this.props.onClose} className='info__button event-btn'>Ok</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Info.PropTypes = {
	status: PropTypes.string,
	message: PropTypes.string,
	isShow: PropTypes.bool,
	onClose: PropTypes.func
};

Info.defaultProps = {
	isShow: false
};

export default Info;
