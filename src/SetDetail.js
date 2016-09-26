'use strict';
import React from 'react';
import _ from 'lodash';
import {get, search} from './api';
import Card from './Card';
import FilterForm from './FilterForm';

export default React.createClass({
	searchCards(e) {
		search({[e.target.name]: e.target.value})
		.then(results => {
			this.setState({
				cards: results
			});
		});
	},
	getInitialState() {
		return {
			cards: []
		};
	},
	render() {
		const cards = _(this.state.cards)
			.take(100)
			.map(card => <Card key={card.code} info={card}/>)
			.value();
		const types = _(this.state.cards)
		.map(card => card.subtype_code)
		.uniq()
		.value().toString();
		console.log(types);

		return (
			<div>
				<FilterForm onChange={this.searchCards} />
				<div className='section'>
					{cards}
				</div>
			</div>
		);
	}

});
