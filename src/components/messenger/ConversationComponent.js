import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Badge, Divider, Typography, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ImportContacts } from '@material-ui/icons';

function ConversationComponent(props) {
    const classes = useStyles();
    const unseenMessages = useSelector((state) => state.messages.unseenMessages);

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
            <ListItemSecondaryAction className={classes.badge}>
                <Badge badgeContent={unseenMessages.filter((m) => m._id == props.conversation._id)[0]?.count} color="secondary"></Badge>
            </ListItemSecondaryAction>
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
    badge: {
        paddingRight: theme.spacing(1),
    },
}));

export default ConversationComponent;
