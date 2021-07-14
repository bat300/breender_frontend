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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        backgroundColor: '#f7ebd7',
        padding: theme.spacing(4),
        paddingTop: theme.spacing(6),
        margin: 'auto',
        marginTop: theme.spacing(6),
        maxWidth: '85%',
    },
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
        margin: theme.spacing(2),
        marginTop: theme.spacing(6),
    },
    divider: {
        margin: theme.spacing(3),
    },
    black: {
        color: '#fff',
        backgroundColor: '#787878',
    },
    listItem: {
        paddingLeft: '15%',
        paddingRight: '15%',
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function UserProfile(props) {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Paper className={classes.paper} >
            <Grid container justify="space-between" spacing={2}>
                <Grid item />
                <Grid item >
                    <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
                        Account information
                    </Typography>
                </Grid>
                <Grid item>
                    <Button className={classes.button} variant="contained" color="secondary">
                        Edit
                    </Button>
                </Grid>
            </Grid>
            <List>
                <ListItem className={classes.listItem}>
                    <ListItemAvatar>
                        <Avatar className={classes.black}>
                            <AccountCircleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.user.id} secondary="ID" />
                </ListItem>
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
            </List>
            <Divider variant="middle" className={classes.divider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                Payment methods
            </Typography>
            <List className={classes.flexContainer}>
                {(props.user.paymentMethods && props.user.paymentMethods > 0) ? props.user.paymentMethods.map((method) => <Paper className={classes.paperSmall}>
                    <Typography variant='h6'> Type: {method.type} </Typography>
                    <Typography> Details: {method.details}</Typography>
                </Paper>) : <Typography className={classes.typographyNotifications}> No payment methods added yet</Typography>}
            </List >
            <Divider variant="middle" className={classes.divider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                My pets
            </Typography>
            <List>
                {props.pets && props.pets.length > 0 ? props.pets.map((pet) => <SearchResultElement pet={pet} key={pet._id} />) : <Typography className={classes.typographyNotifications} align="center"> No pets added yet</Typography>}
            </List>
        </Paper>
    </div >)
}