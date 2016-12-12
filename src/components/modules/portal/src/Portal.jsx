import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
	
	_renderComponent(){
		let newObj = { children: this.props.children, className: this.props.className }
		ReactDOM.render(
			<div
				{...newObj}
			/>,
			this.node
		);
	}

	componentDidMount(){
		let {node, nodeId, nodeClass} = this.props;
		let nodeById = document.getElementById(nodeId);
		let nodeByClass = document.getElementsByClassName(nodeClass)[0];

		let newNode = node ? node : nodeId ? nodeById : nodeClass ? nodeByClass : null;
		if (newNode){
			this.node = newNode;
		}
		else {
			this.node = document.createElement('div');
			document.body.appendChild(this.node);
		}
		this._renderComponent();
	}

	render() {
		return <div />;
	}

	componentDidUpdate() {
		this._renderComponent();
	}

	componentWillUnmout() {
		document.body.removeChild(this.node);
	}
}

Portal.PropTypes = {
	node: PropTypes.any,
	nodeId: PropTypes.string,
	nodeClass: PropTypes.string,
	className: PropTypes.string
}

export default Portal;