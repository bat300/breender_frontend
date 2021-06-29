import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
}));

function MessageComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.message}>
            <div className={classes.messageTop}>
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/768px-Woman_1.jpg" />
                <p className={classes.messageText}>Hello this is a message!</p>
            </div>
            <div className={classes.messageBottom}>1 hour ago</div>
        </div>
    );
}

export default MessageComponent;
