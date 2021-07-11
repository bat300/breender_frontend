import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

function ConversationComponent(props) {
    var friendId = props.conversation.members.find((m) => m !== props.currentUser.id);
    // TODO: get friend user data
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/768px-Woman_1.jpg" />
            </ListItemAvatar>
            <ListItemText primary={friendId} />
        </ListItem>
    );
}

export default ConversationComponent;
