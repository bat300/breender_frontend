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
import LandscapeIcon from '@material-ui/icons/Landscape';
import PaymentIcon from '@material-ui/icons/Payment';
import { Divider, Typography } from '@material-ui/core';
import { Tooltip } from 'antd';

const useStyles = makeStyles((theme) => ({
    black: {
        color: '#fff',
        backgroundColor: '#787878',
    },
    listItem: {
        paddingLeft: '15%',
        paddingRight: '15%',
    },
    typography: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(6),
    },
    divider: {
        margin: theme.spacing(3),
    },
    typographyNotifications: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
}));

export default function UserInformation(props) {
    const classes = useStyles();

    function changeProvinceFormat() {
        switch (props.user.province) {
            case 'bavaria':
                return 'Bavaria';

            case 'lower-saxony':
                return 'Lower Saxony';

            case 'baden-wuerttemberg':
                return 'Baden Württemberg';

            case 'north-rhine-westphalia':
                return 'North Rhine Westphalia';
            default:
                return '';
        }
    }

    function changeDateFormat() {
        var date = new Date(props.user.endDate);

        return date.toLocaleDateString('en-GB');
    }

    function capitalizeFirstLetter(string) {
        if (typeof string === 'undefined' || (typeof string !== 'undefined' && string.length < 2)) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return props.profileOfLoggedInUser ? (
        <List>
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
                <Tooltip trigger="hover" placement="top" title={props.user.isVerified ? "Your email is verified." : "Your email is NOT verified."}>
                    <div>
                        <VerificationIcon verified={props.user.isVerified} />
                    </div>
                </Tooltip>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.black}>
                        <LandscapeIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={changeProvinceFormat()} secondary="Province" />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.black}>
                        <LocationCityIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={capitalizeFirstLetter(props.user.city)} secondary="City" />
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.black}>
                        <AttachMoneyIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={capitalizeFirstLetter(props.user.subscriptionPlan)} secondary="Subscription plan" />
            </ListItem>
            {props.user.subscriptionPlan === 'premium' && (
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar className={classes.black}>
                            <EventIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={changeDateFormat()} secondary="Premium subscription untill" />
                </ListItem>
            )}
            <Divider variant="middle" className={classes.divider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                Payment method
            </Typography>
            {props.user.paymentMethod ? (
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar className={classes.black}>
                            <PaymentIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.paymentMethod.email} secondary={props.user.paymentMethod.type} />
                </ListItem>
            ) : (
                <Typography className={classes.typographyNotifications} align="center">
                    No payment methods added yet
                </Typography>
            )}
        </List>
    ) : (
        <List>
            <ListItem className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar className={classes.black}>
                        <LocationCityIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.user.city} secondary="City" />
            </ListItem>
        </List>
    );
}
