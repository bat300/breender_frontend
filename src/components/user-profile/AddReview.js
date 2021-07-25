import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(5),
        margin: 'auto',
        maxWidth: '80%',
    },
    typography: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
}));

export default function AddReviewComponent({ ratingProp, reviewProp, ...props }) {
    const classes = useStyles();
    const { rating, setRating } = ratingProp;
    const { review, setReview } = reviewProp;

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid container direction="row" item xs={12}>
                    <Grid item xs>
                        <Typography>
                            How would you rate your experience with {props.name}?
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newRating) => {
                                setRating(newRating);
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="review-input"
                        label="Review"
                        fullWidth
                        multiline
                        rows={6}
                        value={review}
                        variant="outlined"
                        onChange={handleReviewChange}
                    />
                </Grid>
            </Grid>
        </div>)
}