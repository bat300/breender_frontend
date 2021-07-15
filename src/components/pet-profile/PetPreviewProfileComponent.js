import React from 'react';
import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const PetPreviewProfileComponent = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const { pet, username } = props;
    const image = pet.profilePicture.src;

    const redirectToPetPage = () => history.push(`/pet/${pet._id}`)

    return (
        <div onClick={redirectToPetPage}>
        <Grid container className={classes.layout} spacing={2}>
            <Grid item>
                <Avatar className={classes.picture} src={image} alt="Pet Profile Picture" />
            </Grid>
            <Grid item direction="column" spacing={2} className={classes.textLayout}>
                <Typography variant="caption">{pet.officialName}</Typography>
                <Typography variant="caption">{username}</Typography>
            </Grid>
        </Grid>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        cursor: 'pointer',
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
}));

export default PetPreviewProfileComponent;
