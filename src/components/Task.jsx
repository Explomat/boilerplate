import React, { Component } from 'react';
import Modal from './modules/modal';
import { TextView, TextAreaView } from './modules/text-label';
import { AlertDanger } from './modules/alert';
import InputReal from './modules/input-real';

class Task extends Component {
	
	constructor(props){
		super(props);
		
		this.handleSave = this.handleSave.bind(this);
		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleCloseError = this.handleCloseError.bind(this);
		
		/*this._checkFields = () => {
			const { fields } = this.state;
			const { header } = this.props;
			return Object.keys(fields)
				.filter(k => (k in header) && fields[k])
				.length === Object.keys(header).length;
		};*/
		
		this._checkFields = () => {
			const { fields } = this.state;
			const { tasksHeader } = this.props;
			return Object.keys(fields)
				.filter(k => (k in tasksHeader) && fields[k].toString().trim() !== '')
				.length === Object.keys(tasksHeader).length;
		};
		
		const { id, name, unit, weight, min, targ, max, fact, percent, comment } = this.props.task || {};
		this.state = {
			fields: {
				id: id || null,
				name: name || '',
				unit: unit || '',
				weight: weight || 0,
				min: min || 0,
				targ: targ || 0,
				max: max ||  0,
				fact: fact || 0,
				percent: percent || 0,
				comment: comment || ''
			},
			error: null
		};
	}
	
	handleSave(){
		const { onSave } = this.props;
		const isFilled = this._checkFields();
		if (!isFilled){
			this.setState({
				error: 'Необходимо заполнить все поля!'
			});
		} else if (onSave && isFilled) {
			onSave(this.state.fields);
		}
	}
	
	handleChangeField(key, val){
		const { fields } = this.state;
		const newFields = { ...fields };
		newFields[key] = val;
		//newFields.percent = this._calcPercent();
		this.setState({
			fields: newFields
		});
	}
	
	handleCloseError(){
		this.setState({ error: null });
	}
	
	render(){
		const {
			tasksHeader,
			title
		} = this.props;
		const { fields, error } = this.state;
		const { name, unit, weight, min, targ, max, fact, comment } = fields;
		return (
			<Modal
				title={title}
				footerButtonText='Сохранить'
				onClose={this.props.onClose}
				onSave={this.handleSave}
				className='new-task__container'
			>
				{error && <AlertDanger text={error} onClose={this.handleCloseError}/>}
				<div className='new-task'>
					{Object.keys(fields).map((k, index) => {
						if (k in tasksHeader){
							switch (k){
								case 'name':
									return (
										<div key={index} className='new-task__name'>
											<TextAreaView
												value={name}
												placeholder={tasksHeader.name}
												onChange={(val) => this.handleChangeField('name', (val || ''))}
											/>
										</div>
									);
								case 'unit':
									return (
										<div key={index} className='new-task__unit'>
											<TextView
												value={unit}
												placeholder={tasksHeader.unit}
												onChange={(val) => this.handleChangeField('unit', (val || ''))}
											/>
										</div>
									);
								case 'weight':
									return (
										<div key={index} className='new-task__weight'>
											<InputReal
												value={weight}
												title={tasksHeader.weight}
												onChange={(val) => this.handleChangeField('weight', (val || 0))}
												className='form-control'
											/>
										</div>
									);
								case 'min':
									return (
										<div key={index} className='new-task__min'>
											<InputReal
												value={min}
												title={tasksHeader.min}
												onChange={(val) => this.handleChangeField('min', (val || 0))}
												className='form-control'
											/>
										</div>
									);
								case 'targ':
									return (
										<div key={index} className='new-task__targ'>
											<InputReal
												value={targ}
												title={tasksHeader.targ}
												onChange={(val) => this.handleChangeField('targ', (val || 0))}
												className='form-control'
											/>
										</div>
									);
								case 'max':
									return (
										<div key={index} className='new-task__max'>
											<InputReal
												value={max}
												title={tasksHeader.max}
												onChange={(val) => this.handleChangeField('max', (val || 0))}
												className='form-control'
											/>
										</div>
									);
								case 'fact':
									return (
										<div key={index} className='new-task__fact'>
											<InputReal
												value={fact}
												title={tasksHeader.fact}
												onChange={(val) => this.handleChangeField('fact', (val || 0))}
												className='form-control'
											/>
										</div>
									);
								case 'comment':
									return (
										<div key={index} className='new-task__comment'>
											<TextAreaView
												value={comment}
												placeholder={tasksHeader.comment}
												onChange={(val) => this.handleChangeField('comment', (val || 0))}
											/>
										</div>
									);
								default:
									return null;
							}
						}
						return null;
					})}
				</div>
			</Modal>
		);
	}
}

Task.defaultProps = {
	title: 'Добавление задачи'
};

Task.propTypes = {
	tasksHeader: React.PropTypes.object,
	title: React.PropTypes.string,
	footerButtonText: React.PropTypes.string
};

export default Task;