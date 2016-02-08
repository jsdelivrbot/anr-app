'use strict';
import React from 'react';

export default React.createClass({
	propTypes: {
		onChange: React.PropTypes.func,
		onSubmit: React.PropTypes.func
	},
	render() {
		return (
			<form onSubmit={e => {e.preventDefault();}}>
				<input
					className='input'
					name='text'
					placeholder='Filter...'
					type='search'
					onChange={this.props.onChange} />
			</form>
		);
	}

});
