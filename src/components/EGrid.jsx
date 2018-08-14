import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';

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
        originalData: this.props.cards.slice(),
        checks: []
    };

    normalize = str =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase();

    searchProduct = event => {
        let _this = this;
        let { cards } = _this.state;
        let _cards = cards.slice();

        if (!event.target.value) {
            _this.setState({
                cards: _this.state.originalData.slice()
            });
        } else {
            let regex = new RegExp('(.*)(' + _this.normalize(event.target.value) + ')(.*)', 'g');

            let founds = _cards.filter(current => {
                let second = [];
                let temp = current.tags;
                if (Array.isArray(temp)) {
                    temp = temp.slice();
                    second = temp.filter(i => regex.test(_this.normalize(i)));
                } else {
                    second = [];
                }

                return regex.test(_this.normalize(current.text)) || second.length > 0;
            });

            _this.setState({
                cards: founds
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card>
                    <AppBar position="static" className={classes.colorPrimary} style={{ boxShadow: 'none' }}>
                        <Toolbar>
                            <Button aria-label="cotizar" className={classes.button}>
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
                                        prefixUrl={this.props.settings.prefixUrl}
                                        text={card.text}
                                        img={card.img}
                                        description={card.description}
                                        tags={card.tags || []}
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
