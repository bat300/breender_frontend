import React, { useEffect, useState } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMessages, addMessage } from 'redux/actions/messageActions';

import { Grid, Paper, Divider, Typography, List, Button, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ConversationComponent from './ConversationComponent';
import MessageComponent from './MessageComponent';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
    bonker: {
        backgroundColor: 'red',
    },
}));

function MessengerComponent(props) {
    const classes = useStyles();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);

    return (
        <div className={classes.layout}>
            <Grid container alignItems="center" align="center" justify="center" direction="row" spacing={2}>
                <Grid item>
                    <ChatMenuComponent conversations={props.conversations} currentUser={props.currentUser} />
                </Grid>
                <Grid item>{currentChat ? <ChatBoxComponent conversation={currentChat} /> : <span> Open a conversation to start a chat. </span>}</Grid>
            </Grid>
        </div>
    );

    function ChatMenuComponent(menuProps) {
        const classes = useStyles();
        return (
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" variant="outlined" label="Search for breeders..." />
                </form>
                <List>
                    {menuProps.conversations.map((c) => (
                        <div
                            onClick={() => {
                                setCurrentChat(c);
                            }}
                        >
                            <ConversationComponent className={classes.bonker} key={c.id} conversation={c} currentUser={menuProps.currentUser} />
                        </div>
                    ))}
                </List>
            </div>
        );
    }

    function ChatBoxComponent(chatProps) {
        const classes = useStyles();
        const dispatch = useDispatch();
        const [newMessage, setNewMessage] = useState('');

        useEffect(() => {
            let conversationId = chatProps.conversation._id;

            async function loadMessages(id) {
                if (id) {
                    await dispatch(getMessages(id));
                }
            }

            return loadMessages(conversationId);
        }, [dispatch]);

        const loadedMessages = useSelector((state) => state.messages.messages);
        const userId = useSelector((state) => state.user.user.id);

        const handleSubmit = async (e) => {
            // Prevents refreshing of page on click
            e.preventDefault();
            const message = {
                sender: userId,
                text: newMessage,
                conversationId: chatProps.conversation._id,
            };
            dispatch(addMessage(message));
            setMessages([...messages, message]);
            setNewMessage('');
        };

        return (
            <div>
                {Array.isArray(loadedMessages) ? loadedMessages.map((m) => <MessageComponent message={m} />) : 'No messages found!'}
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" variant="outlined" label="Write something..." onChange={(e) => setNewMessage(e.target.value)} />
                </form>
                <Button variant="contained" color="primary" className={classes.button} endIcon={<SendIcon />} onClick={handleSubmit}>
                    Send
                </Button>
            </div>
        );
    }
}

export default MessengerComponent;
