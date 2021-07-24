import React from "react";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
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
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    cardContent: {
        paddingLeft: theme.spacing(8),
    },
    features: {
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexWrap: 'nowrap',
    },
}));
/**
 * For choosing and presenting subscription plan 
 * @param {props} props
 */
function SubscriptionPlanCard(props) {
    const classes = useStyles();

    return (
        <Grid item key={props.plan.title} xs={6}>
            <Card className={props.subscriptionPlan === props.plan.id ? classes.rootChosen : classes.root}>
                <CardHeader
                    title={props.plan.title}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={props.plan.id === 'premium' ? <FontAwesomeIcon icon={faCrown} size={"lg"} style={{ paddingLeft: '4px', color: 'green' }} /> : <></>}
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
                                <div key={`${line}_${props.plan.id}div`}>
                                    <Typography variant="subtitle1" key={`${line}_${props.plan.id}`}>
                                        <div className={classes.features}>
                                            <CheckCircleIcon style={{ fill: 'green', marginRight: '7' }} />
                                            {line}
                                        </div>
                                    </Typography>
                                </div>
                            ))}      
                            {props.plan.excluded.map((line) => (
                                <div key={`${line}_${props.plan.id}div`}>
                                    <Typography variant="subtitle1" key={`${line}_${props.plan.id}`}>
                                        <div className={classes.features}>
                                            <CancelIcon style={{ fill: 'red', marginRight: '7' }} />
                                            {line}
                                        </div>
                                    </Typography>
                                </div>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardActions>
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
