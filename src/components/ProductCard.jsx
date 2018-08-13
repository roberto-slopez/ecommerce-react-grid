import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';

const styles = () => ({
    card: {
        maxWidth: 400
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    actions: {
        display: 'flex'
    }
});

class ProductCard extends React.Component {
    state = {
        classes: null
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    static defaultProps = {
        prefixUrl: ''
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid item xs={3}>
                <Card className={classes.card}>
                    <CardHeader
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.text}
                    />
                    <CardMedia className={classes.media} image={this.props.prefixUrl + this.props.img} title="Contemplative Reptile" />
                    <CardContent>
                        <Typography component="p">{this.props.description}</Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <Checkbox
                            icon={<Add />}
                            checkedIcon={<Done />}
                            //checked={this.state.checkedB}
                            //onChange={this.handleChange('checkedB')}
                            value="true"
                            color="primary"
                        />
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
    prefixUrl: PropTypes.object.string
};

export default withStyles(styles)(ProductCard);
