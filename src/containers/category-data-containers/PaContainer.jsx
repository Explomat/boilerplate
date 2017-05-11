import React, { Component } from 'react';
import ViewTask from '../../components/ViewTask';
import Task from '../../components/Task';
import { ButtonDefault, ButtonPrimary } from '../../components/modules/button';
import { AlertInfo } from '../../components/modules/alert';
import Portal from '../../components/modules/portal';
import Confirm from '../../components/modules/confirm';

import { getVisibleTasksByPa, getCheckedTasksByPa } from '../../selectors';
import { dom } from '../../config';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';

class PaContainer extends Component {
	
	constructor(props){
		super(props);
		
		this.handleToggleConfirm = this.handleToggleConfirm.bind(this);
		this.handleToggleSelectTask = this.handleToggleSelectTask.bind(this);
		this.handleToogleDisplayNewTask = this.handleToogleDisplayNewTask.bind(this);
		this.handleToggleEditTask = this.handleToggleEditTask.bind(this);
		this.handleRemoveTasks = this.handleRemoveTasks.bind(this);
		this.handleAddNewTask = this.handleAddNewTask.bind(this);
		this.handleEditTask = this.handleEditTask.bind(this);
		
		this.state = {
			isDisplayNewTask: false,
			isDisplayEditTask: false,
			isDisplayConfirm: false
		};
	}
	
	handleToggleConfirm(){
		this.setState({ isDisplayConfirm: !this.state.isDisplayConfirm });
	}
	
	handleToggleSelectTask(taskId, val){
		this.props.toggleSelectTask(taskId, val);
	}
	
	handleRemoveTasks(isConfirm){
		const { id, removeTasks } = this.props;
		if (isConfirm){
			removeTasks(id);
		}
		this.handleToggleConfirm();
	}
	
	handleAddNewTask(task){
		const { id, addTask } = this.props;
		this.handleToogleDisplayNewTask();
		addTask(id, task);
	}
	
	handleEditTask(task){
		const { id, editTask } = this.props;
		this.handleToggleEditTask();
		editTask(id, task);
	}
	
	handleToggleEditTask(){
		this.setState({ isDisplayEditTask: !this.state.isDisplayEditTask });
	}
	
	handleToogleDisplayNewTask(){
		this.setState({ isDisplayNewTask: !this.state.isDisplayNewTask });
	}
	
	_renderTasks(){
		const { isEdit, tasksHeader, tasks } = this.props;
		return (
			<table className='tasks'>
				<thead>
					<tr>
						<th />
						{Object.values(tasksHeader).map((h, index) => {
							return <th key={index} className='tasks__header-name'>{h}</th>;
						})}
					</tr>
				</thead>
				<tbody>
					{tasks.map((t, index) => {
						return (
							<ViewTask
								key={index}
								{...t}
								isEdit={isEdit && t.isEdit}
								tasksHeader={tasksHeader}
								onToggleSelect={this.handleToggleSelectTask}
							/>
						);
					})}
				</tbody>
			</table>
		);
	}
	
	render(){
		const { isEdit, title, tasksHeader, tasks, checkedTasksCount, calcs, editedTask } = this.props;
		const { isDisplayNewTask, isDisplayEditTask, isDisplayConfirm } = this.state;
		return (
			<div className='pa'>
				<h4>{title}</h4>
				<div className='tasks-container'>
					{tasks.length > 0 ? this._renderTasks() : <AlertInfo text='Список задач пуст' isClose={false} />}
					{isEdit &&
						<div className='tasks-container__menu clearfix'>
							<div className='tasks-container__edit'>
								{(checkedTasksCount === 1) &&
									<ButtonPrimary
										text='Редактировать'
										onClick={this.handleToggleEditTask}
										className='tasks-container__edit-button'
									/>
								}
								{(checkedTasksCount > 0) &&
									<ButtonDefault
										text='Удалить'
										onClick={this.handleToggleConfirm}
										className='tasks-container__delete-button'
									/>
								}
							</div>
							<ButtonDefault
								text='Добавить'
								onClick={this.handleToogleDisplayNewTask}
								className='tasks-container__add-button'
							/>
						</div>
					}
					{isDisplayNewTask &&
						<Task
							tasksHeader={tasksHeader}
							onClose={this.handleToogleDisplayNewTask}
							onSave={this.handleAddNewTask}
						/>
					}
					{isDisplayEditTask &&
						<Task
							tasksHeader={tasksHeader}
							title='Редактирование задачи'
							footerButtonText='Сохранить'
							onClose={this.handleToggleEditTask}
							onSave={this.handleEditTask}
							task={editedTask}
						/>
					}
				</div>
				<div className='calcs'>
					{calcs.map((c, index) =>
						<span key={index}>
							<span className='calcs__label'>{c.name}</span>
							<span className='calcs__value'>{c.value}</span>
						</span>
					)}
				</div>
				<Portal nodeId={dom.portalModalId}>
					{isDisplayConfirm &&
						<Confirm
							text='Вы действительно хотите удалить выбранные задачи?'
							onConfirm={this.handleRemoveTasks}
							onClose={this.handleToggleConfirm}
						/>
					}
				</Portal>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const checkedTasks = getCheckedTasksByPa(state, ownProps);
	const editedTask = checkedTasks[0];
	return {
		...state.pas[ownProps.id],
		tasks: getVisibleTasksByPa(state, ownProps),
		checkedTasksCount: checkedTasks.length,
		editedTask
	};
}


export default connect(mapStateToProps, actionCreators)(PaContainer);
