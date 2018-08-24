import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Avatar from '@material-ui/core/Avatar';

import { lensPath, set } from 'ramda';

import AppSearch from './AppSearch';
import ProductCard from './ProductCard';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    button: {
        margin: theme.spacing.unit,
        color: '#FFFFFF'
    },
    flex: {
        flexGrow: 1
    },
    avatar: {
        margin: 10
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    colorPrimary: {
        background: '#FFD600'
    }
});

class EGrid extends React.Component {
    state = {
        cards: this.props.cards,
        originalData: this.props.cards.slice()
    };

    normalize = str =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase();

    searchProduct = event => {
        let updatedList = this.state.originalData;
        updatedList = updatedList.filter(current => {
            let second = [];
            let isValid = this.normalize(current.text).search(event.target.value.toLowerCase()) !== -1;

            if (Array.isArray(current.tags)) {
                second = current.tags.filter(i => this.normalize(i).search(event.target.value.toLowerCase()) !== -1);
            }

            return isValid || second.length > 0;
        });

        this.setState({ cards: updatedList });
    };

    /**
     * Dynamic modify object
     * @param {string} fieldPath name path object
     * @param {string|int} value value to assign in path
     * @param {string} ref value to assign in path
     */
    updateList(fieldPath, value, ref) {
        let obj = {};

        obj[ref] = set(lensPath(fieldPath), value, this.state[ref]);
        this.setState(obj);
    }

    handleCheck = unique => {
        this.setUpdate('originalData', unique);
        //Partial update
        this.setUpdate('cards', unique);
    };

    setUpdate = (name, unique) => {
        let correlative = this.state[name]
            .map(function(e) {
                return e.unique;
            })
            .indexOf(unique);

        this.updateList([correlative, 'isChecked'], !this.state[name][correlative].isChecked, name);
    };

    getCheckeds = () => {
        this.props.settings.getChecks(this.state.cards.filter(i => i.isChecked));
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Card>
                    <AppBar
                        position="static"
                        className={classes.colorPrimary}
                        style={{ boxShadow: 'none', background: this.props.settings.brandColor }}
                    >
                        <Toolbar>
                            <Button
                                onClick={this.getCheckeds}
                                aria-label={this.props.settings.translation.getchecks}
                                className={classes.button}
                            >
                                <MonetizationOn className={classes.extendedIcon} />
                                {this.props.settings.translation.getchecks}
                            </Button>
                            <AppSearch handleKeyDown={this.searchProduct} />
                            <span className={classes.flex} />
                            <Avatar alt={this.props.settings.brandAlt} src={this.props.settings.brandLogo} className={classes.avatar} />
                        </Toolbar>
                    </AppBar>
                    <CardContent>
                        <Grid container spacing={32}>
                            {this.state.cards.map((card, key) => {
                                return (
                                    <ProductCard
                                        handleCheck={this.handleCheck}
                                        prefixUrl={this.props.settings.prefixUrl}
                                        text={card.text}
                                        img={card.img}
                                        description={card.description}
                                        tags={card.tags || []}
                                        isChecked={card.isChecked}
                                        unique={card.unique}
                                        key={key}
                                    />
                                );
                            }, this)}
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

EGrid.propTypes = {
    classes: PropTypes.object.isRequired,
    cards: PropTypes.object.isRequired,
    settings: PropTypes.object
};

export default withStyles(styles)(EGrid);
