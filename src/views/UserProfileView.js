import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/user-profile/UserProfile";
import { useUser } from 'helper/hooks/auth.hooks';
import { getUsersInfo, getUserPets, getReviewsOnUser } from 'redux/actions';

function UserProfileView(props) {
    const user = useUser();
    // get information on user from the redux store
    var usersInfo = useSelector((state) => state.user.userInfo);
    var pets = useSelector((state) => state.user.pets);
    var reviews = useSelector((state) => state.user.reviews);

    const loadUser = async () => {
        // trigger the redux action getUsersInfo
        usersInfo = props.dispatch(getUsersInfo(user.id));
    };

    const loadUserPets = async () => {
        // trigger the redux action getUserPets
        pets = props.dispatch(getUserPets(user.id));
    };

    const loadReviews = async () => {
        // trigger the redux action getReviewsOnUser
        reviews = props.dispatch(getReviewsOnUser(user.id));
    };

    useEffect(() => {
        // load user when the page is loaded and the information is not yet in the redux store
        if (!usersInfo) {
            loadUser();
        }
    }, [usersInfo]);

    useEffect(() => {
        // load pets of a user when the page is loaded and the information is not yet in the redux store
        if (!pets) {
            loadUserPets();
        }
    }, [pets]);

    useEffect(() => {
        // load reviews on a user when the page is loaded and the information is not yet in the redux store
        if (!reviews) {
            loadReviews();
        }
    }, [pets]);

    return <UserProfile user={usersInfo ? usersInfo : user} pets={pets} profileOfLoggedInUser={true} reviews={reviews} />
}

export default connect()(UserProfileView);