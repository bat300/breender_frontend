import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, TextField, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    userLoginRoot: {
        margin: 'auto',
    },
    loginPaper: {
        width: '500px',
        padding: theme.spacing(4),
    },
    loginRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            paddingBottom: theme.spacing(0),
        },
        '&:first-child': {
            paddingTop: theme.spacing(0),
        },
    },
    loginButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        color: 'secondary',
    },
    loginButton: {
        marginLeft: theme.spacing(1),
        color: 'secondary',
    },
}));

/**
 * For user login
 * @param {props} props
 */
function LoginComponent(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    //set to false when component is rendered for the first time in order to skip error message from previous login
    const [rendered, setRendered] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');

    useEffect(() => {
        if (props.user.error) {
            if (rendered) {
                //if component is rendered for the 2. or more times, show new error
                setLoginError(props.user.error);
            }
        } else {
            setLoginError('');
        }
    }, [props.user]);

    const onLogin = (e) => {
        e.preventDefault();
        props.onLogin(username, password);
        setRendered(true); //set to true when user tries to login for the first time
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setLoginError('');
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setLoginError('');
    };

    return (
        <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <div className={classes.loginRow}>
                    <TextField label="Username" variant="outlined" fullWidth value={username} onChange={onChangeUsername} error={loginError !== ''} />
                </div>
                <div className={classes.loginRow}>
                    <TextField label="Password" variant="outlined" fullWidth value={password} onChange={onChangePassword} error={loginError !== ''} type="password" />
                </div>
                {loginError !== '' ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                <div className={classes.loginRow + ' ' + classes.loginButtons}>
                    <Button onClick={props.onSignUp}>Not Registered yet?</Button>
                    <div>
                        <Button variant="outlined" color="primary" className={classes.loginButton} onClick={props.onCancel}>
                            Cancel
                        </Button>
                        <Button className={classes.loginButton} variant="contained" color="primary" onClick={onLogin} disabled={username === '' || password === ''} type="submit">
                            Login
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(withRouter(LoginComponent));
