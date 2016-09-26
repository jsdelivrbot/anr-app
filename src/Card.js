'use strict';
import React from 'react';
import {API_URL} from './consts';
import Tag from './Tag';

export default function Card(props) {
	return (
		<div className='card'>
			<div className='card-content'>
				<p className='title is-5'>{props.info.title}</p>
				<p className='subtitle is-6'>{`${props.info.type} - ${props.info.subtype}`}</p>
				<p>{props.info.text}</p>
				{props.tags.map(tag => <Tag name={tag}/>)}
				<small><em>{props.info.flavor}</em></small>
			</div>
		</div>
	);
}

Card.propTypes = {
	info: React.PropTypes.object
};
