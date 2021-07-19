import React, { useEffect, useState } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { getOrAddConversation } from '../redux/actions/conversationActions';
import MessengerComponent from '../components/messenger/MessengerComponent';
import MessengerView from './MessengerView';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

function MessengerNewContactView(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector((state) => state.user.user);
    let url = location.pathname.split('/messenger/')[1];
    let breederId = url.split('/')[0];
    let petId = url.split('/')[1];

    useEffect(() => {
        let userId = user.id;

        async function loadConversation(id1, id2) {
            console.log('Checking conversations and creating if needed...');
            await dispatch(getOrAddConversation(id1, id2));
        }
        return loadConversation(userId, breederId);
    }, [dispatch]);

    const loadedConversation = useSelector((state) => state.conversations.conversation);

    return !loadedConversation ? <Loading /> : loadedConversation ? <MessengerView currentConversation={loadedConversation} /> : null;
}

// connect() establishes allows the usage of redux functionality
export default connect()(MessengerNewContactView);
