import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUnseenMessages } from '../redux/actions/messageActions';
import { useLoggedInUser } from '../helper/hooks/auth.hooks';

function ScrollToTop({ history }) {
    const dispatch = useDispatch();
    const loggedInUser = useLoggedInUser();
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });

        if (loggedInUser) {
            dispatch(getUnseenMessages(loggedInUser._id));
        }
        return () => {
            unlisten();
        };
    }, []);

    return null;
}

export default withRouter(ScrollToTop);
