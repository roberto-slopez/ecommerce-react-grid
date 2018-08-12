import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import ProductCard from './ProductCard';

const styles = () => ({
    root: {
        flexGrow: 1
    }
});

class EGrid extends React.Component {
    state = {
        cards: this.props.cards || [],
        originalData: this.props.cards || [],
        checks: []
    };

    searchProduct = event => {
        let { cards } = this.state;
        console.log(cards);
        console.log(event.target.value);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Card>
                    <CardHeader
                        action={
                            <Grid container spacing={8} alignItems="flex-end">
                                <Grid item>
                                    <Search />
                                </Grid>
                                <Grid item>
                                    <TextField id="search" label="Buscar" type="search" margin="normal" onChange={this.searchProduct} />
                                </Grid>
                            </Grid>
                        }
                    />

                    <CardContent>
                        <Grid container spacing={24}>
                            {this.state.cards.map((card, key) => {
                                return <ProductCard text={card.text} img={card.img} description={card.description} key={key} />;
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
    cards: PropTypes.object.isRequired
};

export default withStyles(styles)(EGrid);
