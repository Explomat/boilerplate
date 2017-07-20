import React from 'react';
import PropTypes from 'prop-types';

const DropInfoHeader = (props, context) => {
	const handleClick = () => {
		context.parent.handleToogleExpand();
	};

	const { className, children } = props;
	return (
		<div onClick={handleClick} className={`dropinfo__content-header ${className}`}>
			{children}
		</div>
	);
};

DropInfoHeader.contextTypes = {
	parent: PropTypes.any
};

export default DropInfoHeader;