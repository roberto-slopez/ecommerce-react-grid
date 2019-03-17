import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LabelIcon from '@material-ui/icons/Label';

import { lensPath, set } from 'ramda';

import AppSearch from './AppSearch';
import ProductCard from './ProductCard';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: 0,
        marginRight: 0
    },
    button: {
        margin: theme.spacing.unit,
        color: '#FFFFFF'
    },
    flex: {
        flexGrow: 1
    },
    list: {
        width: 250
    },
    avatar: {
        margin: 10
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    colorPrimary: {
        background: '#FFD600'
    },
    fab: {
        margin: 0,
        zIndex: 2,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }
});

class EGrid extends React.Component {
    state = {
        cards: this.props.cards,
        groups: this.props.groups,
        opendrawer: false,
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
    handleDrawerOpen = () => {
        this.setState({ opendrawer: true });
    };
    handleClickGroup = e => {
        let data = JSON.parse(e.currentTarget.dataset.items);
        this.setState({ cards: data, originalData: data });
    };
    handleDrawerClose = () => {
        this.setState({ opendrawer: false });
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
        let correlative = this.state[name].map(i => i.unique).indexOf(unique);
        this.updateList([correlative, 'isChecked'], !this.state[name][correlative].isChecked, name);
    };

    getCheckeds = () => {
        this.props.settings.getChecks(this.state.cards.filter(i => i.isChecked));
    };

    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                <List>
                    {this.state.groups.map(i => (
                        <ListItem button key={i.text} onClick={this.handleClickGroup} data-items={JSON.stringify(i.data)}>
                            <ListItemIcon>
                                <LabelIcon />
                            </ListItemIcon>
                            <ListItemText primary={i.text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <Card>
                    <AppBar
                        position="static"
                        className={classes.colorPrimary}
                        style={{ boxShadow: 'none', background: this.props.settings.brandColor }}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open menu"
                                onClick={this.handleDrawerOpen}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <AppSearch handleKeyDown={this.searchProduct} />
                            <span className={classes.flex} />
                            <Avatar alt={this.props.settings.brandAlt} src={this.props.settings.brandLogo} className={classes.avatar} />
                        </Toolbar>
                    </AppBar>
                    <CardContent>
                        <Drawer open={this.state.opendrawer} onClose={this.handleDrawerClose}>
                            <div tabIndex={0} role="button" onClick={this.handleDrawerClose} onKeyDown={this.handleDrawerClose}>
                                {sideList}
                            </div>
                        </Drawer>
                        <Fab
                            color="secondary"
                            className={classes.fab}
                            onClick={this.getCheckeds}
                            aria-label={this.props.settings.translation.getchecks}
                        >
                            <MonetizationOn />
                        </Fab>
                        <Grid container spacing={40} direction="row" justify="flex-start" alignItems="stretch">
                            {this.state.cards.map((card, key) => {
                                return (
                                    <ProductCard
                                        handleCheck={this.handleCheck}
                                        prefixUrl={this.props.settings.prefixUrl}
                                        text={card.text}
                                        img={card.img}
                                        onSale={card.onSale}
                                        description={card.description}
                                        tags={card.tags || []}
                                        isChecked={card.isChecked}
                                        unique={card.unique}
                                        price={card.price}
                                        currency={this.props.settings.currency}
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
    settings: PropTypes.object,
    groups: PropTypes.array
};

export default withStyles(styles)(EGrid);
