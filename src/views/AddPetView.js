import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { PetInformationForm, PetPhotosForm } from 'components/forms';

const AddPetView = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.layout}>
                <Grid container spacing={2}>
                    <Grid item>
                        <PetPhotosForm />
                    </Grid>
                    <Grid item>
                        <PetInformationForm />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        alignSelf: 'center',
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
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

// connect() establishes the connection to the redux functionalities
export default connect()(AddPetView);
