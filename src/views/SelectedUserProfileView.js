import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/user-profile/UserProfile";
import { getUser, getSelectedUserPets } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { ViewCarouselOutlined } from '@material-ui/icons';

function SelectedUserProfileView(props) {
    const dispatch = useDispatch();
    const location = useLocation();

    const userId = location.pathname.split('/user/')[1];
    //get selectedUser and pets from Redux store
    var selectedUser = useSelector((state) => state.user.selectedUser);
    var pets = useSelector((state) => state.user.selectedUserPets);

    const loadUser = async (id) => {
        console.log('I am in the load user')
        // trigger the redux action getSelectedUserPets
        selectedUser = props.dispatch(getUser(id));
        console.log('user: ', selectedUser)
    };

    useEffect(() => {
        console.log('I will check user now');
        console.log('Id is ', userId)
        console.log(selectedUser);
        // load user when the page is loaded
        if (!selectedUser || (selectedUser && selectedUser._id !== userId)) {
            console.log('Loading user');
            loadUser(userId);
        }
    }, [selectedUser]);

    useEffect(() => {
        // load pets of a user when the page is loaded
        if (!pets || (pets && pets.length > 0 && pets[0].ownerId !== userId)) {
            loadUserPets();
        }
    }, [pets]);



    const loadUserPets = async () => {
        console.log('I am in the load users pets')
        // trigger the redux action getSelectedUserPets
        pets = props.dispatch(getSelectedUserPets(userId));
        console.log('pets: ', pets)
    };

    return !selectedUser ? (
        <Loading />
    ) : <UserProfile user={selectedUser} pets={pets} profileOfLoggedInUser={false} />
}

export default connect()(SelectedUserProfileView);