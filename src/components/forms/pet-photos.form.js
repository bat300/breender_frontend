import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { AvatarUpload, MultiplePhotosUpload } from 'components/upload';

function PetPhotosForm(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        flex: 1,
        [theme.breakpoints.up('sm')]: {
            width: 450,
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    label: {
        fontSize: 18,
        marginBottom: 20,
    },
}));

export default PetPhotosForm;
