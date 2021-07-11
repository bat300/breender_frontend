import React, { useEffect, useState } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { getConversations } from '../redux/actions/conversationActions';
import MessengerComponent from '../components/messenger/MessengerComponent';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';

function MessengerView(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        let userId = user.id;

        async function loadConversations(id) {
            await dispatch(getConversations(id));
        }

        return loadConversations(userId);
    }, [dispatch]);

    const loadedConversations = useSelector((state) => state.conversations);

    return !loadedConversations.conversations ? (
        <Loading />
    ) : !Array.isArray(loadedConversations.conversations) ? (
        <div>error</div>
    ) : loadedConversations.conversations ? (
        <MessengerComponent conversations={loadedConversations.conversations} currentUser={user} />
    ) : null;
}

// connect() establishes allows the usage of redux functionality
export default connect()(MessengerView);
