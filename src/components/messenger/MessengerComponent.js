import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, List, Button, Icon } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ConversationComponent from './ConversationComponent';
import MessageComponent from './MessageComponent';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
}));

function MessengerComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <Grid container alignItems="center" align="center" justify="center" direction="row" spacing={2}>
                <Grid item>
                    <ChatMenuComponent />
                </Grid>
                <Grid item>
                    <ChatBoxComponent />
                </Grid>
            </Grid>
        </div>
    );
}

function ChatMenuComponent(props) {
    const classes = useStyles();

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" variant="outlined" label="Search for breeders..." />
            </form>
            <List>
                <ConversationComponent />
            </List>
        </div>
    );
}

function ChatBoxComponent(props) {
    const classes = useStyles();

    return (
        <div>
            <MessageComponent />
            <MessageComponent />
            <MessageComponent />
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" variant="outlined" label="Write something..." />
            </form>
            <Button variant="contained" color="primary" className={classes.button} endIcon={<SendIcon />}>
                Send
            </Button>
        </div>
    );
}

export default MessengerComponent;
