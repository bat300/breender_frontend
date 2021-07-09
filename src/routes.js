import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// views
import UserLoginView from './views/UserLoginView';
import SignUpView from './views/SignUpView';
import AddPetView from './views/AddPetView';
import PetProfileView from './views/PetProfileView';
import EmailConfirmationView from './views/EmailConfirmationView';
import EditPetView from './views/EditPetView';
import NotFoundView from './views/NotFoundView';
import SearchView from './views/SearchView';
// services
import { LocalStorageService, NotificationService } from 'services';
import Header from 'components/Header';
import AppTheme from 'theming/themetypes';

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
    const isAuthorized = LocalStorageService.isAuthorized();
    useEffect(() => {
        if (!isAuthorized) {
            NotificationService.notify('warning', 'Warning', 'You have to be logged in to view this page')
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
            <PrivateRoute exact path="/pet/:id">
                <PetProfileView />
            </PrivateRoute>
            <PrivateRoute exact path="/add-pet">
                <AddPetView />
            </PrivateRoute>
            <PrivateRoute exact path="/edit/pet/:id">
                <EditPetView />
            </PrivateRoute>
            <DefaultRoute path="*">
                <NotFoundView />
            </DefaultRoute>
        </Switch>
    );
};

export default Routes;
