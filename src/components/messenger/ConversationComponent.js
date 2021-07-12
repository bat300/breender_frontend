import React from 'react';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getUser } from 'redux/actions/userActions';
import { useDispatch } from 'react-redux';

function ConversationComponent(props) {
    const dispatch = useDispatch();
    let friendId = props.conversation.members.find((m) => m !== props.currentUser.id);

    useEffect(() => {
        async function loadFriend(id) {
            await dispatch(getUser(id));
        }

        return loadFriend(friendId);
    }, [dispatch]);

    const friend = useSelector((state) => state.fetchedUser);
    // TODO: set friend avatar
    return !friend?.user ? null : (
        <ListItem button key={friendId}>
            <ListItemAvatar>
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Woman_1.jpg/768px-Woman_1.jpg" />
            </ListItemAvatar>
            <ListItemText primary={friend ? friend.user.username : 'Unknown'} />
        </ListItem>
    );
}

export default ConversationComponent;
