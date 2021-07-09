import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginReset, logout } from 'redux/actions';
import { NotificationService } from 'services';

const DataFetcher = React.memo(() => {
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const isLoading = useSelector((state) => state.fetcher.isLoading);


    useEffect(() => {
        let fetch = true;
    

        const logoutRedirect = () => {
            if (fetch && isAuthenticated === false) {
                dispatch(logout());
                NotificationService.notify('warning', 'Warning', 'You were logged out.')
            } else if (fetch && !isLoading) {
                dispatch(loginReset())
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