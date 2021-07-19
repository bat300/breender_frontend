
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserLoginView from './views/UserLoginView';
import SignUpView from './views/SignUpView';
import AddPetView from './views/AddPetView';
import PetProfileView from "./views/PetProfileView";
import EmailConfirmationView from './views/EmailConfirmationView';
import UserProfileView from "./views/UserProfileView";
import SubscriptionPageView from './views/SubscriptionPageView';
import EditPetView from './views/EditPetView';
import NotFoundView from './views/NotFoundView';
import SearchView from './views/SearchView';
import SelectedUserProfileView from './views/SelectedUserProfileView';
// services
import { LocalStorageService } from 'services';
import Header from 'components/Header';
import AppTheme from 'theming/themetypes';
import ChangeToPremiumView from 'views/ChangeToPremiumView';
import ReviewComponent from 'components/user-profile/ReviewComponent';
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
            <PrivateRoute exact path="/review">
                <ReviewComponent review={{ reviewerId: 12345, revieweeId: 1234, review: "Everything was awsome. The user is very friendly, the dog is the best.dfvdhsbfjsfidsfhjdfhjsfsdfkjweifhjdakfjgr8uehfafghjfdgh  udhdisd  udhdhf udhg sudhfudfhh ud  iidjghoeuhfdfgdfdfzeuhr  dfdjgheuwhskjdisjdi", rating: 4, reviewDate: "2020-22-01", verifiedTransaction: false }} />
            </PrivateRoute>
            <PrivateRoute exact path="/add-review">
                <AddReview />
            </PrivateRoute>
            <DefaultRoute path="*">
                <NotFoundView />
            </DefaultRoute>
        </Switch>
    );
};

export default Routes;
