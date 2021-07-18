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

const useStyles = makeStyles((theme) => ({
    black: {
        color: '#fff',
        backgroundColor: '#787878',
    },
    listItem: {
        paddingLeft: '15%',
        paddingRight: '15%',
    },
}));

export default function UserInformation(props) {
    const classes = useStyles();

    return props.profileOfLoggedInUser ? (<List>
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.black}>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.username} secondary="Username" />
        </ListItem>
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.black}>
                    <AlternateEmailIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.email} secondary="Email" />
            <VerificationIcon verified={props.user.isVerified} />
        </ListItem>
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.black}>
                    <LocationCityIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.city} secondary="City" />
        </ListItem>
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <Avatar className={classes.black}>
                    <AttachMoneyIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.user.subscriptionPlan} secondary="Subscription plan" />
        </ListItem>
        {props.user.subscriptionPlan === 'premium' &&
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.black}>
                        <EventIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.user.nextRenewalDate} secondary="Next renewal date" />
            </ListItem>}
    </List>)
        : (<List>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.black}>
                        <LocationCityIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.user.city} secondary="City" />
            </ListItem>
        </List>)

}