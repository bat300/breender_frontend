import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/user-profile/UserProfile";
import { useUser } from 'helper/hooks/auth.hooks';
import { getUsersInfo, getUserPets } from 'redux/actions';

function UserProfileView(props) {
    const user = useUser();
    var usersInfo = useSelector((state) => state.user.userInfo);
    var pets = useSelector((state) => state.user.pets);

    const loadUser = async () => {
        console.log('I am in the load user')
        // trigger the redux action getUsersInfo
        usersInfo = props.dispatch(getUsersInfo(user.id));
        console.log('user: ', usersInfo)
    };

    const loadUserPets = async () => {
        console.log('I am in the load users pets')
        // trigger the redux action getUser
        pets = props.dispatch(getUserPets(user.id));
        console.log('pets: ', pets)
    };

    useEffect(() => {
        // load user when the page is loaded
        if (!usersInfo) {
            loadUser();
        }
    }, [usersInfo]);

    useEffect(() => {
        // load pets of a user when the page is loaded
        if (!pets) {
            loadUserPets();
        }
    }, [pets]);

    return <UserProfile user={usersInfo ? usersInfo : user} pets={pets} editable={true} />
}

export default connect()(UserProfileView);