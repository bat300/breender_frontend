import React, { useEffect, useState } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { getConversations } from '../redux/actions/conversationActions';
import MessengerComponent from '../components/messenger/MessengerComponent';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';

function MessengerView(props) {
    const user = useSelector((state) => state.user.user);
    const loadedConversations = useSelector((state) => state.conversations.conversations);

    useEffect(() => {
        // load movies when the page is loaded or the movies have changed.
        if (!loadedConversations) {
            console.log(user.id);
            loadConversations();
        }
    }, [loadedConversations]);

    const loadConversations = async () => {
        // trigger the redux action getMovies
        console.log(user.id);
        props.dispatch(getConversations(user.id));
    };

    console.log(JSON.stringify(loadedConversations));
    return !loadedConversations ? <Loading /> : !Array.isArray(loadedConversations) ? <div>error</div> : loadedConversations ? <MessengerComponent conversations={loadedConversations} /> : null;
}

// connect() establishes allows the usage of redux functionality
export default connect()(MessengerView);
