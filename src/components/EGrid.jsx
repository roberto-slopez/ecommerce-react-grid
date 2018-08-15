import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';
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
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    colorPrimary: {
        background: '#FEC503'
    }
});

class EGrid extends React.Component {
    state = {
        settings: this.props.settings,
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
     */
    setObjectByPath(fieldPath, value) {
        this.setState({
            cards: set(lensPath(fieldPath), value, this.state.cards)
        });
    }

    handleCheck = correlative => {
        this.setObjectByPath([correlative, 'isChecked'], !this.state.cards[correlative].isChecked);
    };

    getCheckeds = () => {
        console.log(this.state.cards.filter(i => i.isChecked));
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card>
                    <AppBar position="static" className={classes.colorPrimary} style={{ boxShadow: 'none' }}>
                        <Toolbar>
                            <Button onClick={this.getCheckeds} aria-label="cotizar" className={classes.button}>
                                <AttachMoney className={classes.extendedIcon} />
                                Cotizar
                            </Button>
                            <AppSearch handleKeyDown={this.searchProduct} />
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
                                        correlative={key}
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
