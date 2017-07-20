import React from 'react';

const DropInfoFooter = ({ className, children }) => {
	return (
		<div className={`dropinfo__content-footer ${className}`}>
			{children}
		</div>
	);
};

export default DropInfoFooter;