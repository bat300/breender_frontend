import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Paper, Divider, Typography } from '@material-ui/core';
import PetInformationPaper from '../PetInformationPaper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UserInformation from './UserInformation';
import UserForm from './UserForm';
import { NotificationService } from 'services';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/actions';
import ReviewComponent from './ReviewComponent';

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
        borderRadius: 25,
    },
    paperSmall: {
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: '75%',
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
    button: {
        margin: theme.spacing(1),
    },
    black: {
        color: '#fff',
        backgroundColor: '#787878',
    },
    listItem: {
        paddingLeft: '15%',
        paddingRight: '15%',
    },
}));

export default function UserProfile(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [editingMode, setEditingMode] = React.useState(false);
    const [username, setUsername] = React.useState(props.user.username);
    const [email, setEmail] = React.useState(props.user.email);
    const [province, setProvince] = React.useState(props.user.province);
    const [city, setCity] = React.useState(props.user.city);
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [paymentMethod, setPaymentMethod] = React.useState(props.user.paymentMethod);
    const [disableSave, setDisableSave] = React.useState(false);

    const handleModeChange = (event) => {
        if (editingMode) {
            updateUserOnSave();
            setEditingMode(false);
        } else {
            setEditingMode(true);
        }
    };

    const updateUserOnSave = async () => {

        let userWithChanges = {
            _id: props.user._id,
            username: username,
            email: email,
            province: province,
            city: city,
            paymentMethod: paymentMethod,
            subscriptionPlan: props.user.subscriptionPlan
        };


        if (password !== '' && password2 !== '' && password === password2) {
            userWithChanges.password = password
        }

        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your profile was successfully updated!');
            setDisableSave(false);
            history.push('/user');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem updating your profile.');
        };

        dispatch(updateUser(userWithChanges, onSuccess, onError));
    };

    const handleAddPet = (event) => {
        history.push('/add-pet');
    };


    return (<div className={classes.root}>
        <Paper className={classes.paper} >
            <Grid container justify="space-between" spacing={2}>
                <Grid item />
                <Grid item >
                    <Typography variant="h6" align="center" style={{ fontWeight: 600 }}>
                        {props.profileOfLoggedInUser ? "Account information" : username.toUpperCase()}
                    </Typography>
                </Grid>
                <Grid item>
                    {props.profileOfLoggedInUser ? <Button className={classes.button} variant="contained" color="primary" onClick={handleModeChange} disabled={disableSave}>
                        {editingMode ? "Save" : "Edit"}
                    </Button> : <div />}

                </Grid>
            </Grid>
            {editingMode ?
                <UserForm
                    usernameProp={{ username, setUsername }}
                    emailProp={{ email, setEmail }}
                    provinceProp={{ province, setProvince }}
                    cityProp={{ city, setCity }}
                    passwordProp={{ password, setPassword }}
                    password2Prop={{ password2, setPassword2 }}
                    paymentMethodProp={{ paymentMethod, setPaymentMethod }}
                    disableSaveProp={{ disableSave, setDisableSave }}
                    subscriptionPlan={props.user.subscriptionPlan} />
                : <UserInformation user={props.user} profileOfLoggedInUser={props.profileOfLoggedInUser} />}
            <Divider variant="middle" className={classes.divider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                {props.profileOfLoggedInUser ? "My pets" : "Pets"}
            </Typography>
            <List>
                {props.pets && props.pets.length > 0 ?
                    props.pets.map((pet) => <PetInformationPaper pet={pet} user={props.user} key={pet._id} editingMode={editingMode} fromSearch={false} />)
                    : (!editingMode ?
                        <Typography className={classes.typographyNotifications} align="center">
                            No pets added yet
                        </Typography> : <div />)}
                {editingMode ? (props.user.isVerified ?
                    <Button style={{ margin: '0 auto', display: "flex" }} variant="contained" color="secondary" onClick={handleAddPet}>
                        Add pet
                    </Button>
                    : <Typography className={classes.typographyNotifications} align="center">
                        Please verify your email to add a pet
                    </Typography>) : <div />}
            </List>
            {editingMode ? <div />
                :
                <div>
                    <Divider variant="middle" className={classes.divider} />
                    <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                        {props.profileOfLoggedInUser ? "Reviews from other users" : "Reviews"}
                    </Typography>
                    <List>
                        {props.reviews && props.reviews.length > 0 ?
                            props.reviews.map((review) => <ReviewComponent review={review} />)
                            : <Typography className={classes.typographyNotifications} align="center">
                                No reviews added yet
                            </Typography>}
                    </List>
                </div>}
        </Paper>
    </div >)
}