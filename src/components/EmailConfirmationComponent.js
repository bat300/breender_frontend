import React from 'react';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Button } from '@material-ui/core';

/**
 * For user login
 * @param {props} props
 */
function EmailConfirmationComponent(props) {
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={3}>
                {props.confirmation.confirmation ? (
                    <div>
                        <h1>{props.confirmation.confirmation.message}</h1>
                        <Button variant="contained" color="secondary" onClick={props.onMove}>
                            Go to Home Page
                        </Button>
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
