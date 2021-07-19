import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import { NotificationService } from 'services';
import { addReview } from 'redux/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


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

export default function ReviewComponent(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState('');

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const saveReview = async () => {
        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your review was successfully added!');
            history.push('/transactions');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem adding your review.');
        };
        console.log("Rating is", rating)
        console.log("Date is ", new Date().toLocaleDateString('de-DE'))

        let reviewToUpload = {
            reviewerId: "60ca0cbd023a5b21ed707dfc",
            revieweeId: "60ca0cbd023a5b21ed707dfc",
            review: review,
            rating: rating,
            verifiedTransaction: false,
        };

        dispatch(addReview(reviewToUpload, onSuccess, onError));
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid container direction="row" item xs={12}>
                        <Grid item xs>
                            <Typography>
                                How would you rate your experience with XY?
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
                    <Grid container direction="row" justify="flex-end" item xs={12}>
                        <Button variant="contained" color="secondary" onClick={saveReview}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>)
}