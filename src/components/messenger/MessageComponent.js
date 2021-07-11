import React, { useEffect, useState, useRef } from 'react';
import { format } from 'timeago.js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
}));

function MessageComponent(props) {
    const classes = useStyles();
    const userId = useSelector((state) => state.user.user.id);
    const scrollRef = useRef();

    function getAlignment() {
        return props.message.sender === userId ? 'right' : 'left';
    }

    function getTimestamp() {
        return props.message.createdAt ? format(props.message.createdAt) : '00:00';
    }

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
    };

    // TODO: scrollRef scrolls to pre-last element
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    // TODO: Get user picture, fix alignment according to sender
    return (
        <ListItem key={props.message.id} ref={scrollRef}>
            <Grid container>
                <Grid item xs={12}>
                    <ListItemText align={getAlignment()} primary={props.message.text} />
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={getAlignment()} secondary={getTimestamp()} />
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default MessageComponent;
