import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/user-profile/UserProfile";
import { getUser, getSelectedUserPets } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

function SelectedUserProfileView(props) {
    const dispatch = useDispatch();
    const location = useLocation();

    const userId = location.pathname.split('/user/')[1];

    useEffect(() => {
        // get id of user from URL
        async function loadUser(id) {
            console.log('ID of selected user:', id);
            await dispatch(getUser(id));
        }

        return loadUser(userId);
    }, [dispatch, userId]);

    const selectedUser = useSelector((state) => state.user.selectedUser);

    useEffect(() => {
        // load pets of a user when the page is loaded
        loadUserPets();
    }, [pets]);

    var pets = useSelector((state) => state.user.selectedUserPets);

    const loadUserPets = async () => {
        console.log('I am in the load users pets')
        // trigger the redux action getSelectedUserPets
        pets = props.dispatch(getSelectedUserPets(userId));
        console.log('pets: ', pets)
    };

    return !selectedUser || (selectedUser && !selectedUser.user && !selectedUser.error) ? (
        <Loading />
    ) : <UserProfile user={selectedUser} pets={pets} editable={false} />
}

export default connect()(SelectedUserProfileView);