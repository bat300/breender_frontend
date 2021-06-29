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
import VerificationIcon from './VerificationIcon';
import { Paper, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
    },
}));

export default function UserProfile(props) {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Paper className={classes.paper}>
            <List>
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
        </Paper>
    </div>)
}