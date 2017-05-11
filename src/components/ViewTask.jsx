import React, { Component } from 'react';
import CheckBox from './modules/checkbox';

class ViewTask extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSelect = this.handleSelect.bind(this);
	}
	
	handleSelect(val){
		const { id, onToggleSelect } = this.props;
		if (onToggleSelect){
			onToggleSelect(id, val);
		}
	}
	
	render(){
		const {
			tasksHeader,
			isEdit,
			checked
		} = this.props;
		return (
			<tr className='task'>
				<td className='task__check-container'>
					<CheckBox
						onChange={this.handleSelect}
						disabled={!isEdit}
						className='task__check'
						checked={checked}
					/>
				</td>
				{Object.keys(tasksHeader).map((k, index) => {
					if (k in this.props){
						return <td key={index} className={`task__name task__name--${k}`}>{this.props[k]}</td>;
					}
					return null;
				})}
			</tr>
		);
	}
}

export default ViewTask;