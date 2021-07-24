import React from 'react';
import PostComponent from './PostComponent';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, Button } from '@material-ui/core';
// state imports
import { useUser } from 'helper/hooks';

/**
 * Manages the process of getting pet details data
 * @param props
 */

function BlogComponent(props) {
    const classes = useStyles();
    const loggedInUser = useUser();

    return (
        <div className={classes.layout}>
            <Grid container>
                {props.posts.map((post) => {
                    return (
                        <Grid item className={classes.spaced}>
                            <PostComponent post={post} />{' '}
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default BlogComponent;

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
    spaced: {
        width: '100%',
        padding: theme.spacing(2),
    },
}));
