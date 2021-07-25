import React, { useEffect, useState, useRef } from 'react';
import { format } from 'timeago.js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

function MessageComponent(props) {
    const classes = useStyles();
    const userId = useSelector((state) => state.user.user.id);
    const scrollRef = useRef();

    function getAlignment() {
        return props.message.sender === userId ? 'right' : 'left';
    }

    function getTimestamp() {
        return props.message.createdAt ? format(props.message.createdAt) : 'just now';
    }

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <ListItem key={props.message.id} ref={scrollRef}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={getAlignment()} primary={props.message.text} />
                </Grid>
                <Grid item xs={12}>
                    <ListItemText
                        align={getAlignment()}
                        secondary={
                            <Typography type="body3" className={classes.timestamp}>
                                {getTimestamp()}
                            </Typography>
                        }
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
}

const useStyles = makeStyles((theme) => ({
    timestamp: {
        color: theme.palette.primary.light,
    },
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
}));

export default MessageComponent;
