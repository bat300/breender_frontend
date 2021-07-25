import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { VerificationIcon } from '../icons';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';
import { getUser, getSelectedUserPets, getReviewsOnSelectedUser } from 'redux/actions';
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
        backgroundColor: '#7D7F9A',
    },
    reviewText: {
        backgroundColor: 'white',
        padding: theme.spacing(3),
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

    const loadUser = async (id) => {
        // trigger the redux action getUser
        dispatch(getUser(id));
    };

    const loadUserPets = async (userId) => {
        // trigger the redux action getSelectedUserPets
        dispatch(getSelectedUserPets(userId));
    };

    const loadReviews = async (userId) => {
        // trigger the redux action getReviewsOnSelectedUser
        dispatch(getReviewsOnSelectedUser(userId));
    };

    const goToUserPage = () => {
        history.push('/user/' + props.review.reviewerId);
        loadUser(props.review.reviewerId);
        loadUserPets(props.review.reviewerId);
        loadReviews(props.review.reviewerId);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={goToUserPage} color="white">Reviewer: {props.review.username}</Button>
                    </Grid>
                    <Grid container direction="row" justify="space-between" item>
                        <Grid item>
                            <Rating name="rating" value={props.review.rating} readOnly />
                        </Grid>
                        <Grid item>
                            <Tooltip trigger="hover" placement="top" title={props.review.transaction.status !== "pending" ? "The transaction of reviewer is processed." : "The transaction of reviewer is NOT processed."}>
                                <div>
                                    <VerificationIcon verified={props.review.transaction.status !== "pending"} />
                                </div>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.reviewText}>
                            <Typography className={classes.typography}>{props.review.review}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" style={{ color: 'white' }}>
                            {new Date(props.review.reviewDate).toLocaleDateString('en-GB')}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
