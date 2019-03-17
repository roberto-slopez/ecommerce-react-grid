// jshint esversion:6
import React from 'react';
import ReactDOM from 'react-dom';
import EGrid from './components/EGrid.jsx';

module.exports = {
    renderAt: function(node, cards, groups, settings) {
        cards = cards || [];
        groups = groups || [];
        //Add control check
        cards = cards.map(i => {
            i.isChecked = false;

            return i;
        });

        ReactDOM.render(<EGrid cards={cards} settings={settings} groups={groups} />, node);
    },
    destroyAtNode: function(node) {
        ReactDOM.unmountComponentAtNode(node);
    }
};
