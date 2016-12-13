const cx = require('classnames');
const React = require('react');
const InputSlider = require('react-input-slider');

module.exports = React.createClass({
	displayName: 'Time',

	render() {
		const m = this.props.moment;

		return (
			<div className={cx('m-time', this.props.className)}>
				<div className='showtime'>
					<span className='time'>{m.format('HH')}</span>
					<span className='separater'>:</span>
					<span className='time'>{m.format('mm')}</span>
				</div>

				<div className='sliders'>
					<div className='time-text'>Часы:</div>
					<InputSlider
						className='u-slider-time'
						xmin={0}
						xmax={23}
						x={m.hour()}
						onChange={this.changeHours}
					/>
					<div className='time-text'>Минуты:</div>
					<InputSlider
						className='u-slider-time'
						xmin={0}
						xmax={11}
						x={m.minute() / 5}
						onChange={this.changeMinutes}
					/>
				</div>
			</div>
		);
	},

	changeHours(pos) {
		const m = this.props.moment;
		m.hours(parseInt(pos.x, 10));
		this.props.onChange(m);
	},

	changeMinutes(pos) {
		const m = this.props.moment;
		m.minutes(parseInt(pos.x, 10) * 5);
		this.props.onChange(m);
	}
});
