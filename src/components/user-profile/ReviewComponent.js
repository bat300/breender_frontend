import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { VerificationIcon } from '../icons';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';

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
    typography: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
}));

export default function ReviewComponent(props) {
    const classes = useStyles();
    const history = useHistory();

    const goToUserPage = () => {
        setTimeout(function () {
            history.push('/user/' + props.review.reviewerId);
        }, 1000);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={goToUserPage} color="white">Reviewer: {props.review.reviewerId}</Button>
                    </Grid>
                    <Grid container direction="row" justify="space-between" item>
                        <Grid item>
                            <Rating name="rating" value={props.review.rating} readOnly />
                        </Grid>
                        <Grid item>
                            <Tooltip trigger="hover" placement="top" title={props.review.transaction.processed ? "The transaction of reviewer is processed." : "The transaction of reviewer is NOT processed."}>
                                <div>
                                    <VerificationIcon verified={props.review.transaction.processed} />
                                </div>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.typography} style={{ color: "white" }}>
                            {props.review.review}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" style={{ color: "white" }} >
                            {new Date(props.review.reviewDate).toLocaleDateString('en-GB')}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div >
    );
}
