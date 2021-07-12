import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        position: 'absolute',
        left: '50%',
        top: '60%',
        transform: 'translate(-50%, -50%)',
    },
}));

/**
 * For user login
 * @param {props} props
 */
function EmailConfirmationComponent(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                {props.confirmation.confirmation ? (
                    <div>
                        <h1>{props.confirmation.confirmation.message}</h1>
                        <div className={classes.button}>
                            <Button variant="contained" color="secondary" onClick={props.onMove}>
                                Go to Home Page
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>"Your email is being verified..."</h1> <LinearProgress />
                    </div>
                )}
            </Grid>
        </Grid>
    );
}

export default EmailConfirmationComponent;
