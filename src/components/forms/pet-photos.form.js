import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { AvatarUpload, MultiplePhotosUpload } from 'components/upload';

function PetPhotosForm(props) {
    const classes = useStyles();

    return (
            <div className={classes.layout}>
                <Paper className={classes.paper}>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <AvatarUpload />
                        <label className={classes.label}>Add more photos</label>
                    </Grid>
                    <Grid style={{ marginLeft: 20 }}>
                        <MultiplePhotosUpload />
                    </Grid>
                </Paper>
            </div>
    );
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flex: 1,
        minWidth: 400,
        maxWidth: 500,
        margin: 10,
    },
    paper: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
        },
    },
    label: {
        fontSize: 18,
        marginBottom: 20,
    },
}));

export default PetPhotosForm;
