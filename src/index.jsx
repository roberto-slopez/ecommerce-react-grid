// jshint esversion:6
import React from 'react';
import ReactDOM from 'react-dom';
import EGrid from './components/EGrid.jsx';

module.exports = {
    renderAt: function(node, cards, groups, settings, cover, name) {
        cards = cards || [];
        groups = groups || [];
        //Add control check
        cards = cards.map(i => {
            i.isChecked = false;

            return i;
        });

        ReactDOM.render(<EGrid cards={cards} settings={settings} groups={groups} cover={cover} name={name} />, node);
    },
    destroyAtNode: function(node) {
        ReactDOM.unmountComponentAtNode(node);
    }
};
