'use strict';
import React from 'react';

export default Tag = (props) => <span className='tag'>{props.name}</span>;

Tag.propTypes = {
	name: React.PropTypes.string
};
