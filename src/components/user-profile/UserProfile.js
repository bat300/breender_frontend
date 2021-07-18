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
    button: {
        margin: theme.spacing(1),
    },
    middleButton: {
        margin: theme.spacing(1),
        display: "flex"
    }
}));

export default function UserProfile(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [editingMode, setEditingMode] = React.useState(false);
    const [username, setUsername] = React.useState(props.user.username);
    const [email, setEmail] = React.useState(props.user.email);
    const [province, setProvince] = React.useState('bavaria');//props.user.province;
    const [city, setCity] = React.useState(props.user.city);
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const handleModeChange = (event) => {
        if (editingMode) {
            updateUserOnSave();
            setEditingMode(false);
        } else {
            setEditingMode(true);
        }
    };

    const updateUserOnSave = async () => {

        let userWithChanges = props.user;
        userWithChanges.username = username;
        userWithChanges.email = email;
        userWithChanges.city = city;

        if (password !== '' && password2 !== '' && password === password2) {
            userWithChanges.password = password
        }

        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your profile was successfully updated!');
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
                    {props.profileOfLoggedInUser ? <Button className={classes.button} variant="contained" color="secondary" onClick={handleModeChange}>
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
                    subscriptionPlan={props.user.subscriptionPlan} />
                : <UserInformation user={props.user} profileOfLoggedInUser={props.profileOfLoggedInUser} />}
            {props.profileOfLoggedInUser ?
                <div>
                    <Divider variant="middle" className={classes.divider} />
                    <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                        Payment methods
                    </Typography>
                    <List className={classes.flexContainer}>
                        {(props.user.paymentMethods && props.user.paymentMethods > 0) ?
                            props.user.paymentMethods.map((method) => <Paper className={classes.paperSmall}>
                                <Typography variant='h6'> Type: {method.type} </Typography>
                                <Typography> Details: {method.details}</Typography>
                            </Paper>)
                            : (editingMode ?
                                <Button style={{ margin: '0 auto', display: "flex" }} variant="contained" color="secondary" >
                                    Add payment method
                                </Button>
                                : <Typography className={classes.typographyNotifications}>
                                    No payment methods added yet
                                </Typography>)}
                    </List >
                </div> : <div />}
            <Divider variant="middle" className={classes.divider} />
            <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                {props.profileOfLoggedInUser ? "My pets" : "Pets"}
            </Typography>
            <List>
                {props.pets && props.pets.length > 0 ?
                    props.pets.map((pet) => <PetInformationPaper pet={pet} user={props.user} key={pet._id} editingMode={editingMode} />)
                    : (editingMode ?
                        <Button style={{ margin: '0 auto', display: "flex" }} variant="contained" color="secondary" onClick={handleAddPet}>
                            Add pet
                        </Button>
                        : <Typography className={classes.typographyNotifications} align="center">
                            No pets added yet
                        </Typography>)}
            </List>
        </Paper>
    </div >)
}