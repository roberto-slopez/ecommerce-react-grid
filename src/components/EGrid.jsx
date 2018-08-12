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
        cards: this.props.cards,
        originalData: this.props.cards.slice(),
        checks: []
    };

    searchProduct = event => {
        let { cards } = this.state;
        let _cards = cards.slice();

        if (!event.target.value) {
            this.setState({
                cards: this.state.originalData.slice()
            });
        } else {
            let regex = new RegExp('(.*)(' + event.target.value + ')(.*)', 'g');
            let founds = _cards.filter(current => regex.test(current.text));

            this.setState({
                cards: founds
            });
        }
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
