import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import LocalOffer from '@material-ui/icons/LocalOffer';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
    card: {
        maxWidth: 400,
        margin: 2,
        height: '100%'
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: -28
    },
    rootGrid: {
        paddingTop: theme.spacing.unit * 5
    },
    media: {
        height: 0,
        position: 'relative',
        paddingTop: '56.25%'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    }
});

class ProductCard extends React.Component {
    state = {
        classes: null
    };

    handleCheck = () => {
        this.props.handleCheck(this.props.unique);
    };

    static defaultProps = {
        prefixUrl: ''
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid xs={12} sm={3} className={classes.rootGrid}>
                <Card className={classes.card}>
                    <CardHeader
                        title={
                            <Typography variant="title" gutterBottom>
                                {this.props.text}
                                {this.props.onSale ? (
                                    <Tooltip title="On Sale" placement="right-start">
                                        <LocalOffer color="secondary" />
                                    </Tooltip>
                                ) : (
                                    ''
                                )}
                            </Typography>
                        }
                    />
                    <CardMedia className={classes.media} image={this.props.prefixUrl + this.props.img} title="Dev">
                        {this.props.isHiddenFab && (
                            <Fab color="primary" className={classes.fab}>
                                <Add />
                            </Fab>
                        )}
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h6">
                            {this.props.currency}
                            {this.props.price}
                        </Typography>
                        <Typography component="p">{this.props.description}</Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {this.props.tags.map((tag, key) => {
                            return (
                                <Chip
                                    key={key}
                                    avatar={
                                        <Avatar>
                                            <KeyboardArrowRight />
                                        </Avatar>
                                    }
                                    label={tag}
                                    className={classes.chip}
                                />
                            );
                        }, this)}
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

ProductCard.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string,
    currency: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
    prefixUrl: PropTypes.object.string,
    tags: PropTypes.array,
    isChecked: PropTypes.bool,
    onSale: PropTypes.bool,
    isHiddenFab: PropTypes.bool,
    unique: PropTypes.string,
    price: PropTypes.number,
    handleCheck: PropTypes.function
};

export default withStyles(styles)(ProductCard);
