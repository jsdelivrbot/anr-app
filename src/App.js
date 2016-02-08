'use strict';
import React from 'react';
import _ from 'lodash';
import {get, reset} from './api';
import SetDetail from './SetDetail';
import {toggleSet} from './userstate';

export default React.createClass({
    propTypes: {
        userState: React.PropTypes.object
    },
    loadData() {
        get('sets/').then(data => {
            this.setState({
                sets: data
            });
        });
    },
    getInitialState() {
        return {
            code: '',
            sets: []
        };
    },
    componentWillMount() {
        this.loadData();
    },
    componentWillReceiveProps(nextProps) {
        this.loadData();
    },
    render() {
        const sets = _(this.state.sets)
        .sortBy('cyclenumber')
        .sortBy('number')
        .map(set => <ChooseSetButton
            key={set.code}
            onToggleSet={toggleSet}
            selected={this.props.userState.sets.includes(set.code)}
            set={set}/>)
        .value();

        return (
            <div>
                <div className='container'>
                    <h1 className='title'>anr-app</h1>
                    <div className='tabs is-boxed'>
                        <ul>
                            <li className='is-active'><a><i className='fa fa-download'></i>{' Download Sets'}</a></li>
                            <li><a><i className='fa fa-tasks'></i>{' Build Decks'}</a></li>
                        </ul>
                    </div>
                    <div className='columns'>
                        <div className='column is-quarter'>
                            <nav className='menu'>
                            {sets}
                                <div className='menu-block'>
                                    <button
                                        className='button is-danger is-fullwidth'
                                        onClick={reset}>
                                        {'RESET DATA'}
                                    </button>
                                </div>
                            </nav>
                        </div>
                        <div className='column'>
                        {this.props.userState.sets.length ?
                            <SetDetail/> :
                            <div className='message'>
                                <div className='message-header'>Hi!</div>
                                <div className='message-body'>Choose any number of sets to the left to get started.</div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <footer className='footer'>
                    <div className='container is-centered'>
                        <p>{`Built with react-hot-boilerplate, bulma, React, mobservable, and the netrunnerdb API by @ihgrant.`}</p>
                        <a className="icon" href="https://github.com/ihgrant/anr-app">
                            <i className="fa fa-github"></i>
                        </a>
                    </div>
                </footer>
            </div>
        );
    }

});

const ChooseSetButton = React.createClass({
    onToggleSet() {
        this.props.onToggleSet(this.props.set.code);
    },
    render() {
        return (
            <label htmlFor={this.props.set.code} className='menu-checkbox'>
                <input
                    checked={this.props.selected}
                    id={this.props.set.code}
                    type='checkbox'
                    onChange={this.onToggleSet} />
                    {this.props.set.name}
            </label>
        );
    }
});
