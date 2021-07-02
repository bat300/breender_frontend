import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from 'redux/actions';

const DataFetcher = React.memo(() => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);


    useEffect(() => {
        let fetch = true;
    

        const logoutRedirect = async () => {
            if (fetch && !isAuthenticated) {
                dispatch(logout());
                history.replace('/login');
            }
        };

        logoutRedirect();

        return () => {
            fetch = false;
        };
    }, [isAuthenticated]);

    return <React.Fragment />;
});

export default DataFetcher;