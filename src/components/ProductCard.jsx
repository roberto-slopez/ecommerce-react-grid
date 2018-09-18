import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import LocalOffer from '@material-ui/icons/LocalOffer';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    card: {
        maxWidth: 400,
        height: '100%'
    },
    rootGrid: {
        paddingTop: theme.spacing.unit * 2
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
    chip: {
        margin: 0.5
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
                        action={
                            <Checkbox
                                icon={<Add />}
                                checkedIcon={<Done />}
                                checked={this.props.isChecked}
                                onChange={this.handleCheck}
                                value="true"
                                color="primary"
                            />
                        }
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
                    <CardMedia className={classes.media} image={this.props.prefixUrl + this.props.img} title="Contemplative Reptile" />
                    <CardContent>
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
    img: PropTypes.string,
    description: PropTypes.string,
    prefixUrl: PropTypes.object.string,
    tags: PropTypes.array,
    isChecked: PropTypes.bool,
    onSale: PropTypes.bool,
    unique: PropTypes.string,
    handleCheck: PropTypes.function
};

export default withStyles(styles)(ProductCard);
