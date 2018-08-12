// jshint esversion:6
import React from 'react';
import ReactDOM from 'react-dom';
import EGrid from './components/EGrid.jsx';

module.exports = {
    renderAt: function(node, cards) {
        cards = cards || [];
        ReactDOM.render(<EGrid cards={cards} />, node);
    },
    destroyAtNode: function(node) {
        ReactDOM.unmountComponentAtNode(node);
    }
};
