import {observable, toJSON} from 'mobservable';
const localforage = require('localforage');
import _ from 'lodash';

import {del, get} from './api';

let userState = observable({
	sets: [], // sets the user has selected
	tags: []
});

function toggleSet(code) {
	if (userState.sets.includes(code)) {
		_.pull(userState.sets, code);
		del(`set/${code}`);

	} else {
		userState.sets.push(code);
		get(`set/${code}`);
		save();
	}
}

function save() {
	// persist all of user state to storage
	localforage.setItem('userState', toJSON(userState));
}

// initialize user state from storage on initalization, if state is stored.
localforage.getItem('userState')
.then(state => {
	if (state) {
		userState.sets = state.sets;
	}
});

export {toggleSet, userState};
