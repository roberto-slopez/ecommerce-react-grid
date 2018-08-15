import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
//import MoreVertIcon from '@material-ui/icons/MoreVert';
import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import LocalOffer from '@material-ui/icons/LocalOffer';

const styles = theme => ({
    card: {
        maxWidth: 400
    },
    rootGrid: {
        paddingTop: '10px'
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    chip: {
        margin: theme.spacing.unit
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
        this.props.handleCheck(this.props.correlative);
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
                        title={this.props.text}
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
                                            <LocalOffer />
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
    correlative: PropTypes.init,
    handleCheck: PropTypes.function
};

export default withStyles(styles)(ProductCard);
