import React, { Component } from 'react';
import { AlertInfo } from './modules/alert';
import { ButtonDefault } from './modules/button';

class Test extends Component {
	
	_renderTestMarkup(){
		const { name, score, state } = this.props;
		return (
			<table className='test'>
				<thead>
					<tr>
						<th className='test__th'>Название</th>
						<th className='test__th'>Результат</th>
						<th className='test__th'>Статус</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='test__td'>{name}</td>
						<td className='test__td'>{score}</td>
						<td className='test__td'>{state}</td>
					</tr>
				</tbody>
			</table>
		);
	}
	
	render(){
		const { id, message, isAssignTest, isPassTest, onActivate } = this.props;
		if (isPassTest) {
			return this._renderTestMarkup();
		}
		if (isAssignTest && !isPassTest){
			return <AlertInfo text={message} isClose={false}/>;
		}
		return <ButtonDefault text='Пройти тест' onClick={onActivate.bind(null, id)}/>;
	}
}

export default Test;