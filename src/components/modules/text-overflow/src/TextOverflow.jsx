import React from 'react';
import PropTypes from 'prop-types';

import './style/text-overflow.styl';

class TextOverflow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isDisplayDots: false
		};
	}

	componentDidMount(){
		this._changeDisplayDots();
	}

	shouldComponentUpdate(nextProps, nextState){
		return (nextProps.value !== this.props.value || nextState.isDisplayDots !== this.state.isDisplayDots);
	}

	componentDidUpdate(){
		this._changeDisplayDots();
	}

	_changeDisplayDots(){
		if (this.refs.overflowText.offsetHeight > this.refs.overflowParent.offsetHeight) {
			this.setState({ isDisplayDots: true });
		} else this.setState({ isDisplayDots: false });
	}

	render() {
		const rowsCountClass = `text-overflow-box--${  this.props.rowsCount}`;
		const className = this.props.className ? this.props.className : '';
		const isDisplayDots = this.state.isDisplayDots ? 'text-overflow-box__dots--show' : '';
		return (
			<div ref='overflowParent' className={`text-overflow-box ${  rowsCountClass  } ${  className}`}>
				<p ref='overflowText' title={this.props.value} className='text-overflow-box__text'>{this.props.value}</p>
				<span className={`text-overflow-box__dots ${  isDisplayDots}`}>...</span>
			</div>

		);
	}
}

TextOverflow.propsTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rowsCount: PropTypes.number,
	className: PropTypes.string
};

TextOverflow.defaultProps = {
	rowsCount: 1
};

export default TextOverflow;
