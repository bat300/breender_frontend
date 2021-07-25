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

    useEffect(() => {
        let loading = true;

        const loadUser = async () => {
            // trigger the redux action getUsersInfo
            if (!loading) return;
            await  props.dispatch(getUsersInfo(user.id));
        };
        loadUser();

        return () => {
            loading = false;
        };
    }, [props, user.id]);

    useEffect(() => {
        let loading = true;

        const loadUserPets = async () => {
            // trigger the redux action getUserPets
            if (!loading) return;
            await props.dispatch(getUserPets(user.id));
        };
        loadUserPets();
    
        return () => {
            loading = false;
        };
    }, [props, user.id]);

    useEffect(() => {
        let loading = true;

        const loadReviews = async () => {
            // trigger the redux action getReviewsOnUser
            if (!loading) return;
            await props.dispatch(getReviewsOnUser(user.id));
        };

        loadReviews();
    
        return () => {
            loading = false;
        };
    }, [props, user.id]);

    return <UserProfile user={usersInfo ? usersInfo : user} pets={pets} profileOfLoggedInUser={true} reviews={reviews} />
}

export default connect()(UserProfileView);