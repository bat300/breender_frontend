import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    cardContent: {
        paddingLeft: theme.spacing(13),
    },
    features: {
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexWrap: 'nowrap',
    },
}));
/**
 * For user login
 * @param {props} props
 */
function SubscriptionPlanCard(props) {
    const classes = useStyles();


    return (
        <Grid item key={props.plan.title} xs={6}>
            <Card>
                <CardHeader
                    title={props.plan.title}
                    subheader={props.plan.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={props.plan.id === 'premium' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                />
                <CardContent>
                    <div className={classes.cardPricing}>
                        <Typography component="h2" variant="h3" color="textPrimary">
                            ${props.plan.price}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            /mo
                        </Typography>
                    </div>
                    <div className={classes.cardContent}>
                        <ul>
                            {props.plan.included.map((line) => (
                                <Typography component="li" variant="subtitle1" key={line}>
                                    <div className={classes.features}>
                                        <CheckCircleIcon style={{ fill: 'green' ,marginRight: '7'}} />
                                        {line}
                                    </div>
                                </Typography>
                            ))}
                        </ul>
                        <ul>
                            {props.plan.excluded.map((line) => (
                                <Typography component="li" variant="subtitle1" key={line}>
                                    <div className={classes.features}>
                                        <CancelIcon style={{ fill: 'red' , marginRight: '7'}} />
                                        {line}
                                    </div>
                                </Typography>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant={props.plan.buttonVariant} color="primary" onClick={props.onClick}>
                        {props.plan.buttonText}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

SubscriptionPlanCard.propTypes = {
    plan: PropTypes.object,
};

export default SubscriptionPlanCard;
