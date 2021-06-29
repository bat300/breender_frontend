import React, { useEffect } from 'react';
import { connect, useSelector } from "react-redux";
import UserProfile from "../components/UserProfile";

function UserProfileView(props) {
    const user = useSelector((state) => {
        // return the currnetly logged in user from redux store
        return state.user;
    });

    return <UserProfile user={user} />
}

export default connect()(UserProfileView);