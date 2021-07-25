import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/user-profile/UserProfile";
import { getUser, getSelectedUserPets, getReviewsOnSelectedUser } from 'redux/actions';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

function SelectedUserProfileView(props) {
    const location = useLocation();

    const userId = location.pathname.split('/user/')[1];
    //get selectedUser, pets and reviews from Redux store
    var selectedUser = useSelector((state) => state.user.selectedUser);
    var pets = useSelector((state) => state.user.selectedUserPets);
    var reviews = useSelector((state) => state.user.reviewsOnSelectedUser);

    useEffect(() => {
        let loading = true;

        const loadUser = async (id) => {
            // trigger the redux action getUser
            if (!loading) return;
            await props.dispatch(getUser(id));
        };
        // load user when the page is loaded
        loadUser(userId);

        return () => {
            loading = false;
        };
    }, [props, userId]);

    useEffect(() => {
        let loading = true;

        const loadUserPets = async () => {
            // trigger the redux action getUserPets
            if (!loading) return;
            await props.dispatch(getSelectedUserPets(userId));
        };
        // load pets of a user when the page is loaded
        loadUserPets();
    
        return () => {
            loading = false;
        };
    }, [props, userId]);

    useEffect(() => {
        let loading = true;

        const loadReviews = async () => {
            // trigger the redux action getReviewsOnUser
            if (!loading) return;
            await props.dispatch(getReviewsOnSelectedUser(userId));
        };

        // load reviews on a user when the page is loaded
        loadReviews();
    
        return () => {
            loading = false;
        };
    }, [props, userId]);

    return !selectedUser || selectedUser._id !== userId ? (
        <Loading />
    ) : <UserProfile user={selectedUser} pets={pets} profileOfLoggedInUser={false} reviews={reviews} />
}

export default connect()(SelectedUserProfileView);