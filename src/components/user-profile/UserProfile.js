import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EventIcon from '@material-ui/icons/Event';
import VerificationIcon from '../VerificationIcon';
import { Paper, Divider, Typography } from '@material-ui/core';
import SearchResultElement from '../SearchResultElement';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(6),
        margin: 'auto',
        marginTop: theme.spacing(6),
        maxWidth: '85%',
    },
    /*paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        maxWidth: '95%',
        allign: 'center'
    },*/
    paperSmall: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 100,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    typographyNotifications: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    typography: {
        padding: theme.spacing(2),
        paddingTop: theme.spacing(6),
        margin: 'auto',
    }
}));

export default function UserProfile(props) {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
                Account information
            </Typography>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.id} secondary="ID" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.username} secondary="Username" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AlternateEmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.email} secondary="Email" />
                    <VerificationIcon verified={props.user.isVerified} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LocationCityIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.city} secondary="City" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AttachMoneyIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.subscriptionPlan} secondary="Subscription plan" />
                </ListItem>
                {props.user.subscriptionPlan === 'premium' &&
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EventIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={props.user.nextRenewalDate} secondary="Next renewal date" />
                    </ListItem>}
            </List>
            <Divider variant="middle" className={classes.spacedDivider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                Payment methods
            </Typography>
            <List className={classes.flexContainer}>
                {(props.user.paymentMethods && props.user.paymentMethods > 0) ? props.user.paymentMethods.map((method) => <Paper className={classes.paperSmall}>
                    <Typography variant='h6'> Type: {method.type} </Typography>
                    <Typography> Details: {method.details}</Typography>
                </Paper>) : <Typography className={classes.typographyNotifications}> No payment methods added yet</Typography>}
            </List >
            <Divider variant="middle" className={classes.spacedDivider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                My pets
            </Typography>
            <List>
                {props.pets && props.pets.length > 0 ? props.pets.map((pet) => <SearchResultElement pet={pet} key={pet._id} />) : <Typography className={classes.typographyNotifications} align="center"> No pets added yet</Typography>}
            </List>
        </Paper>
    </div>)
}