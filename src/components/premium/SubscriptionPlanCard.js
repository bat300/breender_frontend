import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CancelIcon, CheckIcon } from 'components/icons';

const useStyles = makeStyles((theme) => ({
    rootChosen: {
        background: theme.palette.primary.main,
        minWidth: 275,
        border: `1px solid rgba(145, 147, 179, 0.5)`,
        boxShadow: '0 6px 10px rgba(0,0,0,.07), 0 0 6px rgba(0,0,0,.02)',
        cursor: 'pointer',
        marginBottom: 30,
    },
    root: {
        border: `1px solid rgba(145, 147, 179, 0.5)`,
        boxShadow: '0 6px 10px rgba(0,0,0,.07), 0 0 6px rgba(0,0,0,.02)',
        cursor: 'pointer',
        marginBottom: 30,
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.light,
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
        alignItems: 'center',
    },
    button: {
        padding: 20,
    },
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
                    //action={isPremium ? <StarTwoToneIcon className={classes.icon} /> : null}
                    className={classes.cardHeader}
                />
                <CardContent>
                    <div className={classes.cardPricing}>
                        <Typography variant="h3" color={`${isPremium ? 'textSecondary' : 'textPrimary'}`}>
                            ${props.plan.price}
                        </Typography>
                        <Typography variant="h6" color={`${isPremium ? 'textSecondary' : 'textPrimary'}`}>
                            /mo
                        </Typography>
                    </div>
                    <div className={classes.cardContent}>
                        <ul>
                            {props.plan.included.map((line) => (
                                <div key={`${line}_${props.plan.id}div`}>
                                    <Typography key={`${line}_${props.plan.id}`} color={`${isPremium ? 'textSecondary' : 'textPrimary'}`}>
                                        <div className={classes.features}>
                                            <CheckIcon style={{ marginRight: 8 }} />
                                            {line}
                                        </div>
                                    </Typography>
                                </div>
                            ))}
                            {props.plan.excluded.map((line) => (
                                <div key={`${line}_${props.plan.id}div`}>
                                    <Typography key={`${line}_${props.plan.id}`}>
                                        <div className={classes.features}>
                                            <CancelIcon style={{ marginRight: 8 }} />
                                            {line}
                                        </div>
                                    </Typography>
                                </div>
                            ))}
                        </ul>
                    </div>
                </CardContent>
                <CardActions className={classes.button}>
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
