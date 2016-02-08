'use strict';
import React from 'react';
import {API_URL} from './consts';

export default React.createClass({
	propTypes: {
		info: React.PropTypes.object
	},
	render() {
		const info = this.props.info;
		return (
			<div className='card'>
				<div className='card-content'>
					<p className='title is-5'>{info.title}</p>
					<p className='subtitle is-6'>{`${info.type} - ${info.subtype}`}</p>
					<p>{info.text}</p>
					<small><em>{info.flavor}</em></small>
				</div>
			</div>
		);
	}

});
