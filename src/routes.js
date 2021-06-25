import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// views
import UserLoginView from './views/UserLoginView';
import SignUpView from './views/SignUpView';
import AddPetView from './views/AddPetView';
import EmailConfirmationView from './views/EmailConfirmationView';
import Search from './components/Search';
// services
import { LocalStorageService } from 'services';
import Header from 'components/Header';
import AppTheme from 'theming/themetypes';

// used for routing
export const PrivateRoute = (props) => {
    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);

    // toggle theme
    const toggleTheme = () => {
        setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
    };

    return LocalStorageService.isAuthorized() ? (
        <Route {...props}>
            <Header darkmode={theme === AppTheme.DARK} toggletheme={toggleTheme} />
            {props.children}
        </Route>
    ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    );
};

export const AuthRoute = (props) => <Route {...props}>{props.children}</Route>;

const Routes = () => {
    return (
        <Switch>
            <AuthRoute exact path="/login">
                <UserLoginView />
            </AuthRoute>
            <AuthRoute path="/register">
                <SignUpView />
            </AuthRoute>
            <AuthRoute path="/confirmation/:email/:token">
                <EmailConfirmationView />
            </AuthRoute>
            <PrivateRoute exact path="/">
                <Search />
            </PrivateRoute>
            <PrivateRoute exact path="/pet/:id">
                {null}
            </PrivateRoute>
            <PrivateRoute exact path="/add-pet">
                <AddPetView />
            </PrivateRoute>
        </Switch>
    );
};

export default Routes;
