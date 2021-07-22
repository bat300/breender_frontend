import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function ConversationComponent(props) {
    let friend = props.conversation.members.find((m) => {
        return m._id !== props.currentUser.id;
    });

    // TODO: set friend avatar
    return !friend ? null : (
        <ListItem button key={friend.username}>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText primary={friend ? friend.username : 'Unknown'} />
        </ListItem>
    );
}

export default ConversationComponent;
