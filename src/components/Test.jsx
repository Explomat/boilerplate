import React, { Component } from 'react';

class Test extends Component {
	render(){
		const { title } = this.props;
		return (
			<div className='vacancy'>
				<div className='vacancy__title'>{title}</div>
			</div>
		);
	}
}


export default Test;