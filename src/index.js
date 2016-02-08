import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobservable-react';
import _ from 'lodash';

import App from './App';
import {userState} from './userstate';

let ObservedApp = observer(App)

ReactDOM.render(
	<ObservedApp userState={userState} />,
	document.getElementById('root')
);
