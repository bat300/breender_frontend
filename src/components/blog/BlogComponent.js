import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
// state imports
import { useUser } from 'helper/hooks';

/**
 * Manages the process of getting pet details data
 * @param props
 */

function BlogComponent(props) {
    const classes = useStyles();
    const loggedInUser = useUser();

    return (
        <div className={classes.layout}>
            <Grid container>
                <Grid item className={classes.maxWidth}>
                    <Paper className={classes.paper}>
                        <Grid container alignItems="stretch" align="center" justify="center" direction="row" className={classes.gridMargin} spacing={2}></Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default withRouter(BlogComponent);

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
    maxWidth: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    cards: {
        margin: theme.spacing(2),
    },
    leftTypography: {
        width: '100%',
        alignItems: 'start',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(4),
    },
    gridMargin: {
        marginTop: theme.spacing(2),
    },
    buttonGrid: {
        marginBottom: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
}));
