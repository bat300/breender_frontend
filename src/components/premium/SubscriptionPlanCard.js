import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
    rootChosen: {
        minWidth: 275,
        border: `4px solid ${theme.palette.secondary.main}`,
    },
    root: {},
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
        paddingLeft: theme.spacing(3)
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(5)
    },
    cardContent: {
        paddingLeft: theme.spacing(8),
    },
    pricing: theme.typography.h4,
    description: theme.typography.body1,
    features: {
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    button: {
        padding: 20,
    },
    checkIcon: {
        marginRight: theme.spacing(1),
        color: '#C0E189',
    },
    crownIcon: {
        color: theme.palette.secondary.main,
    },
    cancelIcon: {
        marginRight: theme.spacing(1),
        color: '#F96149',
    },
    cardActions: {
        padding: theme.spacing(2),
    }
}));

/**
 * For choosing and presenting subscription plan
 * @param {props} props
 */
function SubscriptionPlanCard(props) {
    const classes = useStyles();

    const isPremium = props.plan.id === 'premium';

    return (
        <Grid item key={props.plan.title} xs={6}>
            <Card className={`${props.subscriptionPlan === props.plan.id ? classes.rootChosen : classes.root} ${'resize-on-hover'}`}>
                <CardHeader
                    title={props.plan.title}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={props.plan.id === 'premium' ? <FontAwesomeIcon icon={faCrown} size={"lg"} className={classes.crownIcon} /> : <></>}
                    className={classes.cardHeader}
                />
                <CardContent>
                    <div className={classes.cardPricing}>
                        <Typography component="h2" className={classes.pricing} color="textPrimary">
                            {props.plan.id === "premium" ? `${props.plan.price} €/mo` : `${props.plan.price} €`}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">

                        </Typography>
                    </div>
                    <div className={classes.cardContent}>
                        <ul>
                            {props.plan.included.map((line) => (
                                <div key={`${line}_${props.plan.id}div`}>
                                    <Typography variant="subtitle1" key={`${line}_${props.plan.id}`}>
                                        <div className={classes.features + " " + classes.description}>
                                            <CheckCircleIcon className={classes.checkIcon} />
                                            {line}
                                        </div>
                                    </Typography>
                                </div>
                            ))}
                            {props.plan.excluded.map((line) => (
                                <div key={`${line}_${props.plan.id}div`}>
                                    <Typography variant="subtitle1" key={`${line}_${props.plan.id}`}>
                                        <div className={classes.features + " " + classes.description}>
                                            <CancelIcon className={classes.cancelIcon} />
                                            {line}
                                        </div>
                                    </Typography>
                                </div>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button fullWidth variant="contained" color={props.subscriptionPlan === props.plan.id ? 'secondary' : 'primary'} onClick={props.onClick}>
                        {props.subscriptionPlan === props.plan.id ? 'YOUR CHOICE' : 'CHOOSE'}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

SubscriptionPlanCard.propTypes = {
    plan: PropTypes.object,
    onClick: PropTypes.func,
    subscriptionPlan: PropTypes.string,
};

export default SubscriptionPlanCard;
