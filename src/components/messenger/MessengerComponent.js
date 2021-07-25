import React, { useEffect, useState, useRef } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMessages, addMessage, updateMessagesToSeen, getUnseenMessages } from 'redux/actions/messageActions';
import { Grid, Paper, Divider, Typography, List, ListItem, ListItemText, Button, Icon, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import ConversationComponent from './ConversationComponent';
import MessageComponent from './MessageComponent';
import Loading from 'components/Loading';
import io from 'socket.io-client';

function MessengerComponent(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const userId = useSelector((state) => state.user.user.id);
    const loadedConversations = useSelector((state) => state.conversations.conversations);
    const unseenMessages = useSelector((state) => state.messages.unseenMessages);

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
        if (props.currentConversationId) {
            setCurrentChat(loadedConversations.find((c) => (c.id = props.currentConversationId)));
        }
    }, [props.currentConversationId]);

    useEffect(() => {
        if (currentChat && userId) {
            dispatch(getUnseenMessages(userId));
        }
    }, [currentChat]);

    return (
        <div className={classes.layout}>
            <Grid container component={Paper} className={classes.chatSection}>
                <ChatMenuComponent conversations={props.conversations} currentUser={props.currentUser} />
                <Grid item xs={9}>
                    {currentChat ? (
                        <ChatBoxComponent conversation={currentChat} />
                    ) : (
                        <Typography variant="h2" className="header-message" className={classes.instructions}>
                            Open a conversation to start a chat...
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </div>
    );

    function ChatMenuComponent(menuProps) {
        const classes = useStyles();

        const [searchName, setSearchName] = useState('');

        const handleSearchChange = (e) => {
            setSearchName(e.target.value);
        };

        return (
            <Grid item xs={3} className={classes.chatMenu}>
                <Grid item xs={12} className={classes.padding10}>
                    <TextField
                        className={classes.searchField}
                        InputLabelProps={{ classeName: classes.label }}
                        color="secondary"
                        variant="outlined"
                        label="Filter breeders..."
                        onChange={handleSearchChange}
                        fullWidth
                    />
                </Grid>
                <Divider />
                <List>
                    {menuProps.conversations
                        .filter((c) => {
                            if (c) {
                                if (c.members) {
                                    let friend = c.members.find((m) => {
                                        return m._id !== props.currentUser.id;
                                    });
                                    if (friend.username) {
                                        return friend.username.toLowerCase().includes(searchName.toLowerCase());
                                    }
                                }
                            }
                        })
                        .map((c) => (
                            <div
                                onClick={() => {
                                    setCurrentChat(c);
                                }}
                            >
                                <ConversationComponent conversation={c} currentUser={menuProps.currentUser} isCurrentChat={currentChat ? c._id == currentChat._id : false} />
                            </div>
                        ))}
                </List>
            </Grid>
        );
    }

    // TODO: Make scrolling to bottom message automatic
    function ChatBoxComponent(chatProps) {
        const classes = useStyles();
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

        useEffect(() => {
            setMessages(loadedMessages);
        }, [loadedMessages]);

        useEffect(() => {
            if (Array.isArray(loadedMessages) && loadedMessages.length !== 0) {
                let unseenMessages = loadedMessages.filter((m) => !m.seen && m.sender !== userId).map((m) => m._id);
                if (unseenMessages.length !== 0) {
                    dispatch(updateMessagesToSeen(unseenMessages));
                }
            }
        }, [loadedMessages]);

        const handleSubmit = async (e) => {
            // Prevents refreshing of page on click
            if (e) {
                e.preventDefault();
            }
            const receiver = currentChat.members.find((member) => member._id !== userId);
            const message = {
                sender: userId,
                receiver: receiver._id,
                text: newMessage,
                seen: false,
                conversationId: chatProps.conversation._id,
            };
            setMessages([...messages]);
            socket.current.emit('sendMessage', {
                senderId: userId,
                receiverId: receiver._id,
                receiverEmail: receiver.email,
                receiverUsername: receiver.username,
                text: newMessage,
            });
            dispatch(addMessage(message));
            setNewMessage('');
        };

        return !currentChat ? (
            <Loading />
        ) : (
            <div>
                <List className={classes.messageArea}>
                    {Array.isArray(messages) && messages.length !== 0 ? (
                        messages.map((m) => <MessageComponent message={m} />)
                    ) : (
                        <Typography variant="h2" className="header-message" className={classes.instructions}>
                            Send a message to start a conversation with{' '}
                            {
                                currentChat.members.find((m) => {
                                    return m._id !== props.currentUser.id;
                                }).username
                            }
                            ...
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

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
        paddingTop: theme.spacing(1),
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
    chatMenu: {
        borderRight: '1px solid #e0e0e0',
        backgroundColor: theme.palette.primary.dark,
        borderRadius: theme.shape.borderRadius,
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
    instructions: {
        padding: '20px',
        color: theme.palette.primary.light,
    },
    searchField: {
        color: theme.palette.text.secondary,
        '& fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: theme.palette.secondary.main,
            },
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
        },
        '& label': {
            color: theme.palette.primary.light,
        },
    },
}));

export default MessengerComponent;
