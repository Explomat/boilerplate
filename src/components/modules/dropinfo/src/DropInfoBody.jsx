import React from 'react';

const DropInfoBody = ({ className, children }) => {
	return (
		<div className={`dropinfo__content-body ${className}`}>
			{children}
		</div>
	);
};

export default DropInfoBody;