import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function ConversationComponent(props) {
    const classes = useStyles();

    let friend = props.conversation.members.find((m) => {
        return m._id !== props.currentUser.id;
    });

    // TODO: set friend avatar
    return !friend ? null : (
        <ListItem button key={friend.username} selected={props.isCurrentChat} className={classes.conversationItem}>
            <ListItemAvatar>
                <Avatar className={classes.icon} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="h6" className={classes.username}>
                        {friend ? friend.username : 'Unknown'}
                    </Typography>
                }
            />
        </ListItem>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.light,
    },
    username: {
        color: theme.palette.text.secondary,
    },
}));

export default ConversationComponent;
