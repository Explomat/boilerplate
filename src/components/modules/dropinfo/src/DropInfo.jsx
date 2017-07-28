import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style/dropinfo.styl';

class DropInfo extends Component {

	constructor(props){
		super(props);
		
		this.expanded = props.expanded;
		this.handleToogleExpand = this.handleToogleExpand.bind(this);
		this.state = {
			height: 0
		};
	}

	getChildContext() {
		return {
			parent: this
		};
	}

	componentDidMount(){
		this.expand(this.props.expanded);
	}
	
	componentWillReceiveProps(nextProps){
		if (nextProps.expanded !== undefined && nextProps.expanded !== null){
			this.expand(nextProps.expanded);
		}
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	handleToogleExpand() {
		const { transitionTimeout } = this.props;
		const { expanded } = this.state;
		

		if ((!expanded) === true){
			const self = this;
			this.timeout = setTimeout(() => {
				self.setState({
					height: 'auto'
				});
			}, transitionTimeout * 1000);
		} else {
			this.setState({
				height: this.refs.dropinfoContent.offsetHeight + 20
			});
			clearTimeout(this.timeout);
		}
		this.expand(!expanded);
		
		if (this.props.onExpand) {
			this.props.onExpand(!expanded);
		}
	}

	expand(_expanded){
		const self = this;
		const height = _expanded ? this.refs.dropinfoContent.offsetHeight + 20 : 0;
		setTimeout(() => {
			self.setState({
				height,
				expanded: _expanded
			});
		}, 0);
	}

	render() {
		const { height, expanded } = this.state;
		const { className, transitionTimeout, classNameBlock, label } = this.props;

		const classes = cx({
			'dropinfo': true
		}, className);
		const contentClassName = cx({
			'dropinfo__content-box': true,
			'dropinfo__content-box_show': expanded,
			'dropinfo__content-box_hide': !expanded
		});
		const glyphiconClass = cx({
			'icon-up-open': expanded,
			'icon-down-open': !expanded
		});
		const classNameBl = cx({
			'dropinfo__block': true,
			'clearfix': true
		}, classNameBlock);
		const contentStyles = {
			height,
			'transition': `all ${transitionTimeout}s ease-in-out`,
			'WebkitTransition': `all ${transitionTimeout}s ease-in-out`
		};
		return (
			<div className={classes}>
				<div
					onClick={this.handleToogleExpand}
					className={classNameBl}
				>
					{label}
					<span className={`dropinfo__glyphicon-block ${glyphiconClass}`} />
				</div>
				<div
					ref='dropinfoContentBox'
					style={contentStyles}
					className={contentClassName}
				>
					<div ref='dropinfoContent' className='dropinfo__content'>
						{this.props.children}
						<span
							onClick={this.handleToogleExpand}
							className={`dropinfo__glyphicon-content ${glyphiconClass}`}
						/>
					</div>
				</div>
			</div>
		);
	}
}

DropInfo.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	expanded: PropTypes.bool,
	onExpand: PropTypes.func,
	label: PropTypes.node,
	className: PropTypes.string,
	classNameBlock: PropTypes.string
};

DropInfo.childContextTypes = {
	parent: PropTypes.any
};

DropInfo.defaultProps = {
	transitionTimeout: 1,
	expanded: false
};

export default DropInfo;
