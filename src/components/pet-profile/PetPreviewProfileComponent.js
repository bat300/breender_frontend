import React from 'react';
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';

const PetPreviewProfileComponent = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.layout} spacing={2}>
            <Grid item>
                <Avatar className={classes.picture} src={props.image} alt="Pet Profile Picture" />
            </Grid>
            <Grid item direction="column" spacing={2} className={classes.textLayout}>
                <Typography variant="caption">{props.petsName}</Typography>
                <Typography variant="caption">{props.username}</Typography>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    textLayout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
    },
    picture: {
        width: 50,
        height: 50,
    },
    modal: {
        width: '80vw',
        margin: '0 auto',
        marginTop: 100,
    },
}));

export default PetPreviewProfileComponent;
