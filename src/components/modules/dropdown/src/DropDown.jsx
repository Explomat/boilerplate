import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style/dropdown.styl';

class ItemReset extends React.Component {

	constructor(props){
		super(props);

		this.handleReset = this.handleReset.bind(this);
	}

	handleReset(e) {
		if (this.props.onReset) {
			this.props.onReset(e);
		}
	}

	render(){
		return (
			<li onClick={this.handleReset} className='dropdown-list__item dropdown-list__item--reset'>
				<span>Сбросить</span>
				<span className='reset'>&times;</span>
			</li>
		);
	}
}

class Item extends React.Component {
	
	constructor(props){
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		if (this.props.onChange)			{
			this.props.onChange(e, this.props.payload, this.props.text, this.props.index);
		}
	}

	render() {
		const classes = cx({
			'dropdown-list__item': true,
			'dropdown-list__item--selected': this.props.selected
		});
		return (
			<li className={classes} onClick={this.handleChange}>
				<span>{this.props.text}</span>
			</li>
		);
	}
}

class DropDown extends React.Component {

	constructor(props){
		super(props);

		this.handleBlur = this.handleBlur.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleToggleDisplay = this.handleToggleDisplay.bind(this);

		this.state = {
			display: false
		};
	}

	componentDidMount() {
		document.addEventListener('click', this.handleBlur, true);
	}

	componentWillUnmount() {
		this._unmountComponent();
	}

	handleChange(e, payload, text, index) {
		if (this.props.onChange && this.props.selectedPayload !== payload) {
			this.props.onChange(e, payload, text, index);
		}
	}

	handleBlur() {
		if (this.state.display){
			this.setState({ display: false });
		}
	}

	handleToggleDisplay(e) {
		this._stopPropagation(e);
		if (this.props.disabled){
			return;
		}
		this.setState({ display: !this.state.display });
	}

	getList(){
		const list = [];
		if (this.props.isReset && this.props.selectedPayload){
			list.push(<ItemReset key={'ItemReject'} onReset={this.handleChange}/>);
		}

		this.props.items.forEach((item, index) => {
			if (index !== 0 && this.props.deviders.indexOf(index) !== -1){
				list.push(<li key={`divider${ index  }${1}`} className='dropdown-list__devider' />);
			}
			const selected = this.props.selectedPayload.toString() === item.payload.toString();
			list.push(
				<Item
					key={index + 1}
					selected={selected}
					text={item.text}
					payload={item.payload}
					onChange={this.handleChange}
					index={index}
				/>);
		});
		return list;
	}

	_stopPropagation(e){
		if (!e || (!e.stopPropagation && !e.nativeEvent)) return;
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}

	_unmountComponent(){
		document.removeEventListener('click', this.handleBlur);
	}

	_getSelectedItemText(items, payload){
		if (!payload && this.props.description) return this.props.description;
		if (!payload && Array.isArray(items) && items.length > 0) return items[0].text;
		for (let i = items.length - 1; i >= 0; i--) {
			if (items[i].payload.toString() === payload.toString()){
				return items[i].text;
			}
		}
		return null;
	}

	render() {
		const {
			className,
			classNameChild,
			classNameButton,
			description,
			selectedPayload,
			items,
			title,
			disabled
		} = this.props;

		const classes = cx('dropdown-box', className);
		const classesButton = cx({
			'dropdown-box__default-item': true,
			'dropdown-box__default-item--disabled': disabled
		}, classNameButton);

		const classesTitle = cx({
			'dropdown-box__title': true,
			'dropdown-box__title--description': description && !selectedPayload
		});

		const classesCaret = cx({
			'dropdown-box__caret': true,
			'dropdown-box__caret--display': true,
			'dropdown-box__caret--disabled': disabled
		});

		const classesChild = cx({
			'dropdown-list': true,
			'dropdown-list--display': this.state.display
		}, classNameChild);
		
		const list = this.getList();
		const selectedText = this._getSelectedItemText(items, selectedPayload);
		return (
			<div className={classes}>
				{title && <span className='dropdown-box__mtitle'>{title}</span>}
				{disabled && <div className='dropdown-box__disabled' />}
				<button className={classesButton} type='button' onClick={this.handleToggleDisplay}>
					<span className={classesTitle}>{selectedText}</span>
					<span className={classesCaret} />
				</button>
				<div className='dropdown-box__container'>
					<ul className={classesChild}>{list}</ul>
				</div>
			</div>
		);
	}
}

DropDown.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array.isRequired, // [{ payload: 1, text: 'Test' },{...}]
	// Количество такое же как и items. Payload должен совпадать с payload item. [ payload: 1, iconClass: icon-class ]
	onChange: PropTypes.func,
	deviders: PropTypes.array, // указать индексы элементов после которых вставлять разделители
	selectedPayload: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
	classNameChild: PropTypes.string,
	classNameButton: PropTypes.string,
	isReset: PropTypes.bool,
	disabled: PropTypes.bool
};

DropDown.defaultProps = {
	items: [],
	deviders: [],
	isReset: false,
	disabled: false
};

export default DropDown;
