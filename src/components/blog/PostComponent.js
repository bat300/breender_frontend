import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, Button, Link } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
// state imports
import { useUser } from 'helper/hooks';

/**
 * Manages the process of getting pet details data
 * @param props
 */

function PostComponent(props) {
    const classes = useStyles();
    const post = props.post;

    return (
        <Grid container>
            <Paper>
                <Grid item>
                    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
                        {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
                        <Grid container>
                            <Grid item md={6}>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography component="h2" variant="h4" color="inherit" className={classes.overlay} gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="h6" color="inherit" className={classes.overlay} paragraph>
                                        {post.description}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item className={classes.text}>
                    <Typography variant="body1" color="inherit" paragraph>
                        {post.text}{' '}
                        <Link variant="subtitle1" href={post.link}>
                            {post.linkText}
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default PostComponent;

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        padding: theme.spacing(2),
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    text: {
        padding: theme.spacing(4),
    },
}));
