const cx = require('classnames');
const React = require('react');
const Calendar = require('./calendar');
const Time = require('./time');

require('./style/input-moment.scss');

module.exports = React.createClass({
	displayName: 'InputMoment',

	getInitialState() {
		return {
			tab: 0,
			moment: this.props.moment
		};
	},

	getDefaultProps() {
		return {
			prevMonthIcon: 'icon-left-open-big',
			nextMonthIcon: 'icon-right-open-big'
		};
	},

	componentWillReceiveProps(nextProps){
		this.setState({ moment: nextProps.moment });
	},

	handleChangeDateTime(moment){
		this.setState({ moment });
	},

	handleClickTab(tab, e) {
		e.preventDefault();
		this.setState({ tab });
	},

	handleSave(e) {
		e.preventDefault();
		const m = this.state.moment;
		if (this.props.onSave) this.props.onSave(m);
	},

	render() {
		const tab = this.state.tab;
		const m = this.state.moment;

		return (
			<div className='m-input-moment'>
				<div className='options'>
					<button type='button' className={cx('icon-calendar im-btn', { 'is-active': tab === 0 })} onClick={this.handleClickTab.bind(null, 0)}>
            Дата
          </button>
					<button type='button' className={cx('icon-clock-o im-btn', { 'is-active': tab === 1 })} onClick={this.handleClickTab.bind(null, 1)}>
            Время
          </button>
				</div>

				<div className='tabs'>
					<Calendar
						className={cx('tab', { 'is-active': tab === 0 })}
						moment={m}
						onChange={this.handleChangeDateTime}
						prevMonthIcon={this.props.prevMonthIcon}
						nextMonthIcon={this.props.nextMonthIcon}
					/>
					<Time
						className={cx('tab', { 'is-active': tab === 1 })}
						moment={m}
						onChange={this.handleChangeDateTime}
					/>
				</div>
				<button
					type='button'
					className='im-btn btn-save ion-checkmark'
					onClick={this.handleSave}
				>
          Сохранить
        </button>
			</div>
		);
	}
});
