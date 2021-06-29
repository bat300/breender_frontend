import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
}));

function ConversationComponent(props) {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/768px-Woman_1.jpg" />
            </ListItemAvatar>
            <ListItemText primary="Breeder name" />
        </ListItem>
    );
}

export default ConversationComponent;
