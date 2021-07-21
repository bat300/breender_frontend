import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import VerificationIcon from '../VerificationIcon';
import Popover from '@material-ui/core/Popover';
import { useHistory } from 'react-router-dom';


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
    popover: {
        padding: theme.spacing(1),
    },
}));

export default function ReviewComponent(props) {
    const classes = useStyles();
    const history = useHistory();
    //Ancors for popover
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const goToUserPage = () => {
        history.push('/user/' + props.review.reviewerId);
    };

    //if popover is open
    const open = Boolean(anchorEl);
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={goToUserPage}>
                            Reviewer: {props.review.reviewerId}
                        </Button>
                    </Grid>
                    <Grid container direction="row" justify="space-between" item>
                        <Grid item>
                            <Rating name="rating" value={props.review.rating} readOnly />
                        </Grid>
                        <Grid item>
                            <div aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onClick={handlePopoverOpen} onMouseEnter={handlePopoverOpen}>
                                <VerificationIcon verified={props.review.verifiedTransaction} />
                            </div>
                            <Popover
                                id='mouse-over-popover'
                                classes={{
                                    paper: classes.popover,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography>{props.review.verifiedTransaction ? "The transaction of reviewer is verified." : "The transaction of reviewer is NOT verified."}</Typography>
                            </Popover>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.typography}>
                            {props.review.review}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            {new Date(props.review.reviewDate).toLocaleDateString('de-DE')}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>)
}