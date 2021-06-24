import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
    },
    image: {
        width: 256,
        height: 256,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    button: {
        margin: theme.spacing(1),
    },
    accentText: {
        color: 'ternary',
    },
}));

export default function SearchResultElement(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center">
                    <Grid item className={classes.image}>
                        <img className={classes.img} src={''} />
                    </Grid>
                    <Grid item xs={8} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography className={classes.accentText} gutterBottom variant="h6">
                                    {props.pet.officialName}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>
                                            Age:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom>
                                            {props.pet.age} years old
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>
                                            Sex:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom>
                                            {props.pet.sex}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>
                                            Breed:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom>
                                            {props.pet.breed}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom style={{ fontWeight: 600 }}>
                                            Competition:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom>
                                            {props.pet.competitions.length == 0 ? 'no' : 'yes'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justify="flex-end" spacing={2}>
                                    <Button className={classes.button} variant="contained" color="secondary">
                                        View profile
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{props.pet.price ? props.pet.price : 0} €</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

// attributes of props and their type
SearchResultElement.propTypes = {
    pet: PropTypes.object,
};
