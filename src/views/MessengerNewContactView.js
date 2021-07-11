import React, { useEffect, useState } from 'react';
import { connect, useSelector, dispatch } from 'react-redux';
import { getConversation, addConversation } from '../redux/actions/conversationActions';
import MessengerComponent from '../components/messenger/MessengerComponent';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';

function MessengerNewContactView(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    let breederId = props.match.params.breederId;
    let petId = props.match.params.petId;

    useEffect(() => {
        let userId = user.id;

        async function loadConversation(id1, id2) {
            await dispatch(getConversation(id1, id2));
        }
        return loadConversation(userId, breederId).then(() => handleConversation());
    }, [dispatch]);

    const loadedConversation = useSelector((state) => state.conversation);

    const handleConversation = () => {
        if (!loadedConversation) {
            console.log('CREATE');
        } else {
            console.log('NOT CREATE');
        }
    };

    return !loadedConversation ? <Loading /> : loadedConversation ? <MessengerComponent currentConversation={loadedConversation} currentUser={user} /> : null;
}

// connect() establishes allows the usage of redux functionality
export default connect()(MessengerNewContactView);
