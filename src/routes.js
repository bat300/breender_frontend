import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// views
import UserLoginView from './views/UserLoginView';
import SignUpView from './views/SignUpView';
import AddPetView from './views/AddPetView';
import PetProfileView from './views/PetProfileView';
import EmailConfirmationView from './views/EmailConfirmationView';
import UserProfileView from './views/UserProfileView';
import SubscriptionPageView from './views/SubscriptionPageView';
import EditPetView from './views/EditPetView';
import NotFoundView from './views/NotFoundView';
import SearchView from './views/SearchView';
import SelectedUserProfileView from './views/SelectedUserProfileView';
import TransactionsView from 'views/TransactionsView';
import MessengerView from './views/MessengerView';
import MessengerNewContactView from './views/MessengerNewContactView';
import ChangeToPremiumView from 'views/ChangeToPremiumView';
import AdminConsoleView from 'views/AdminConsoleView';
// services
import { LocalStorageService, NotificationService } from 'services';
import Header from 'components/Header';
import ScrollToTop from 'components/ScrollToTop';
import AppTheme from 'theming/themetypes';
import { useSelector } from 'react-redux';
// Scroll to top dependencies
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';

const DefaultHeader = () => {
    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);

    // toggle theme
    const toggleTheme = () => {
        setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
    };
    return (
        <div>
            <div id="top-anchor" />
            <ScrollToTop />
            <Header darkmode={theme === AppTheme.DARK} toggletheme={toggleTheme} />
        </div>
    );
};

// used for routing
export const PrivateRoute = (props) => {
    const isAuthorized = LocalStorageService.isAuthorized();
    useEffect(() => {
        if (!isAuthorized) {
            NotificationService.notify('warning', 'Warning', 'You have to be logged in to view this page');
        }
    }, [isAuthorized]);

    return isAuthorized ? (
        <Route {...props}>
            <DefaultHeader />
            {props.children}
        </Route>
    ) : (
        <Redirect to={{}} />
    );
};

export const AdminRoute = (props) => {
    const user = useSelector((state) => state.user);

    return LocalStorageService.isAuthorized() && user.user.role === 'admin' ? (
        <Route {...props}>
            <DefaultHeader />
            {props.children}
        </Route>
    ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    );
};

export const DefaultRoute = (props) => <Route {...props}>{props.children}</Route>;

const Routes = () => {
    return (
        <Switch>
            <DefaultRoute exact path="/login">
                <UserLoginView />
            </DefaultRoute>
            <DefaultRoute path="/register">
                <SignUpView />
            </DefaultRoute>
            <DefaultRoute path="/confirmation/:email/:token">
                <EmailConfirmationView />
            </DefaultRoute>
            <DefaultRoute exact path="/">
                <DefaultHeader />
                <SearchView />
            </DefaultRoute>
            <AdminRoute exact path="/admin-console">
                <AdminConsoleView />
            </AdminRoute>
            <DefaultRoute exact path="/premium">
                <DefaultHeader />
                <SubscriptionPageView />
            </DefaultRoute>
            <PrivateRoute exact path="/premium/changePlan">
                <ChangeToPremiumView />
            </PrivateRoute>
            <PrivateRoute exact path="/user/:id">
                <SelectedUserProfileView />
            </PrivateRoute>
            <PrivateRoute exact path="/user">
                <UserProfileView />
            </PrivateRoute>
            <PrivateRoute exact path="/pet/:id">
                <PetProfileView />
            </PrivateRoute>
            <PrivateRoute exact path="/add-pet">
                <AddPetView />
            </PrivateRoute>
            <PrivateRoute exact path="/edit/pet/:id">
                <EditPetView />
            </PrivateRoute>
            <PrivateRoute exact path="/transactions">
                <TransactionsView />
            </PrivateRoute>
            <PrivateRoute exact path="/messenger/:breederId/:petId">
                <MessengerNewContactView />
            </PrivateRoute>
            <PrivateRoute exact path="/messenger">
                <MessengerView />
            </PrivateRoute>
            <DefaultRoute path="*">
                <DefaultHeader />
                <NotFoundView />
            </DefaultRoute>
        </Switch>
    );
};

export default Routes;
