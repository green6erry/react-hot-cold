//MY react hot and cold
var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;

var store = require('./js/store');
var GameContainer = require('./components/GameContainer');

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        <Provider store={store}>
            <GameContainer />
        </Provider>,
        document.getElementById('app')
    );
});