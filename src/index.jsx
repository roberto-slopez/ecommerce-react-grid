// jshint esversion:6
import React from 'react';
import ReactDOM from 'react-dom';
import EGrid from './components/EGrid.jsx';

module.exports = {
    renderAt: function(node, cards, settings) {
        cards = cards || [];
        //Add control check
        cards = cards.map(i => {
            i.isChecked = false;

            return i;
        });

        ReactDOM.render(<EGrid cards={cards} settings={settings} />, node);
    },
    destroyAtNode: function(node) {
        ReactDOM.unmountComponentAtNode(node);
    }
};
