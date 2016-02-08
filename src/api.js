import axios from 'axios';
const localforage = require('localforage');

import {API_URL} from './consts';
import {userState} from './userstate';

localforage.config({
    name        : 'anr-app',
    version     : 1.0,
    storeName   : 'anr_app_data', // Should be alphanumeric, with underscores.
    description : 'locally stored data'
});

const reset = () => localforage.clear();

const get = resource => {
	return localforage.getItem(resource).then(value => {
		if (!value) {
			return axios.get(`${API_URL}/${resource}`)
			.then(response => localforage.setItem(resource, response.data));
		} else {
			return value;
		}
	})
};

const getCards = () => {
	const setsPromise = userState.sets
	.map(code => localforage.getItem(`set/${code}`));
	return Promise.all(setsPromise);
};

const del = resource => localforage.removeItem(resource);

const search = searchCriteria => {
	return getCards()
	.then(results => _.flatten(results))
	.then(results => {
		return results.filter(card => {
			return card.text
				.toLowerCase()
				.includes(searchCriteria.text.toLowerCase());
		});
	});
};

export {del, get, reset, search};
