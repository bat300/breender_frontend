import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/user-profile/UserProfile";
import { getUser, getSelectedUserPets, getReviewsOnSelectedUser } from 'redux/actions';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

function SelectedUserProfileView(props) {
    const dispatch = useDispatch();
    const location = useLocation();

    const userId = location.pathname.split('/user/')[1];
    //get selectedUser, pets and reviews from Redux store
    var selectedUser = useSelector((state) => state.user.selectedUser);
    var pets = useSelector((state) => state.user.selectedUserPets);
    var reviews = useSelector((state) => state.user.reviewsOnSelectedUser);

    const loadUser = async (id) => {
        // trigger the redux action getUser
        selectedUser = props.dispatch(getUser(id));
    };

    const loadUserPets = async () => {
        // trigger the redux action getSelectedUserPets
        pets = props.dispatch(getSelectedUserPets(userId));
    };

    const loadReviews = async () => {
        // trigger the redux action getReviewsOnSelectedUser
        reviews = props.dispatch(getReviewsOnSelectedUser(userId));
    };

    useEffect(() => {
        // load user when the page is loaded
        if (!selectedUser || (selectedUser && selectedUser._id !== userId)) {
            loadUser(userId);
        }
    }, [selectedUser]);

    useEffect(() => {
        // load pets of a user when the page is loaded
        if (!pets || (pets && pets.length > 0 && pets[0].ownerId !== userId)) {
            loadUserPets();
        }
    }, [pets]);

    useEffect(() => {
        // load reviews on a user when the page is loaded
        if (!reviews || (reviews && reviews.length > 0 && reviews[0].revieweeId !== userId)) {
            loadReviews();
        }
    }, [pets]);

    return !selectedUser ? (
        <Loading />
    ) : <UserProfile user={selectedUser} pets={pets} profileOfLoggedInUser={false} reviews={reviews} />
}

export default connect()(SelectedUserProfileView);