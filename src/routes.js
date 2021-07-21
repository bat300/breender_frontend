import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import DocumentListView from './views/DocumentListView';
import SelectedUserProfileView from './views/SelectedUserProfileView';
import TransactionsView from 'views/TransactionsView';
import MessengerView from './views/MessengerView';
import MessengerNewContactView from './views/MessengerNewContactView';
// services
import { LocalStorageService } from 'services';
import Header from 'components/Header';
import AppTheme from 'theming/themetypes';
import { useSelector } from 'react-redux';

import ChangeToPremiumView from 'views/ChangeToPremiumView';
import AddReview from 'components/user-profile/AddReview';

const DefaultHeader = () => {
    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);

    // toggle theme
    const toggleTheme = () => {
        setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
    };
    return <Header darkmode={theme === AppTheme.DARK} toggletheme={toggleTheme} />;
};

// used for routing
export const PrivateRoute = (props) => {
    return LocalStorageService.isAuthorized() ? (
        <Route {...props}>
            <DefaultHeader />
            {props.children}
        </Route>
    ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
};

export const AdminRoute = (props) => {
    const user = useSelector((state) => state.user);

    return LocalStorageService.isAuthorized() && user.user.role === "admin"? (
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
                <DocumentListView />
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
            <PrivateRoute exact path="/add-review">
                <AddReview />
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
                <NotFoundView />
            </DefaultRoute>
        </Switch>
    );
};

export default Routes;
