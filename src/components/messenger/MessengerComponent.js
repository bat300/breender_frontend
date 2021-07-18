import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMessages, addMessage } from 'redux/actions/messageActions';
import { Grid, Paper, Divider, Typography, List, ListItem, ListItemText, Button, Icon, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ConversationComponent from './ConversationComponent';
import MessageComponent from './MessageComponent';
import io from 'socket.io-client';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '85vh',
    },
    headBG: {
        backgroundColor: '#e0e0e0',
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0',
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto',
    },
    padding10: {
        padding: '10px',
    },
    padding20: {
        padding: '20px',
    },
    marginLeft10: {
        marginLeft: '10px',
    },
}));

function MessengerComponent(props) {
    const classes = useStyles();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const userId = useSelector((state) => state.user.user.id);

    useEffect(() => {
        socket.current = io('ws://localhost:8900');
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit('addUser', userId);
    }, [userId]);

    useEffect(() => {
        console.log(JSON.stringify(props.conversations));
    });

    return (
        <div className={classes.layout}>
            <Grid container component={Paper} className={classes.chatSection}>
                <ChatMenuComponent conversations={props.conversations} currentUser={props.currentUser} />
                <Grid item xs={9}>
                    {currentChat ? (
                        <ChatBoxComponent conversation={currentChat} />
                    ) : (
                        <Typography variant="h5" className="header-message" className={classes.padding10}>
                            Open a conversation to start a chat...
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );

    // TODO: Add search functionality
    function ChatMenuComponent(menuProps) {
        const classes = useStyles();
        return (
            <Grid item xs={3} className={classes.borderRight500}>
                <Grid item xs={12} className={classes.padding10}>
                    <TextField id="outlined-basic" variant="outlined" label="Search for breeders..." fullWidth />
                </Grid>
                <Divider />
                <List>
                    {menuProps.conversations.map((c) => (
                        <div
                            onClick={() => {
                                setCurrentChat(c);
                            }}
                        >
                            <ConversationComponent className={classes.bonker} conversation={c} currentUser={menuProps.currentUser} />
                        </div>
                    ))}
                </List>
            </Grid>
        );
    }

    // TODO: Make scrolling to bottom message automatic
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

        const handleSubmit = async (e) => {
            // Prevents refreshing of page on click
            e.preventDefault();
            const message = {
                sender: userId,
                text: newMessage,
                conversationId: chatProps.conversation._id,
            };

            const receiverId = currentChat.members.find((member) => member !== userId);

            socket.current.emit('sendMessage', {
                senderId: userId,
                receiverId,
                text: newMessage,
            });

            dispatch(addMessage(message));
            setMessages([...messages, message]);
            setNewMessage('');
        };

        return (
            <div>
                <List className={classes.messageArea}>
                    {Array.isArray(loadedMessages) ? (
                        loadedMessages.map((m) => <MessageComponent message={m} />)
                    ) : (
                        <Typography variant="h5" className="header-message" className={classes.padding10}>
                            Send a message to start a conversation...
                        </Typography>
                    )}
                </List>
                <Divider />
                <Grid container className={classes.padding20}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic" variant="outlined" label="Write something..." onChange={(e) => setNewMessage(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={1}>
                        <Fab color="primary" aria-label="add" onClick={handleSubmit} className={classes.marginLeft10}>
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MessengerComponent;
