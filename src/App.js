import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollContainer from './components/ScrollContainer';

import reducers from './redux/reducers';
import routes from './routes';
import Header from './components/Header';
import AppTheme from './theming/themetypes';
import AppThemeOptions from './theming/themes';
import AxiosConfiguration from './helper/axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react';

const useStyles = makeStyles((theme) => ({
    appRoot: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
}));

const persistConfig = {
    key: 'root',
    storage,
};

function App() {
    const classes = useStyles();

    useEffect(() => AxiosConfiguration.setupInterceptors(), []);

    // set document title
    useEffect(() => {
        document.title = 'Breender App';
    }, []);

    // create store for redux
    const persistedReducer = persistReducer(persistConfig, reducers);
    const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    const persistor = persistStore(store);

    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);

    // toggle theme
    const toggleTheme = () => {
        setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
    };

    return (
        <div className={classes.appRoot}>
            <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <CssBaseline />
                        <React.Fragment>
                            <Header darkmode={theme === AppTheme.DARK} toggletheme={toggleTheme} />
                            <ScrollContainer>
                                <Switch>
                                    {routes.map((route, i) => (
                                        <Route key={i} {...route} />
                                    ))}
                                </Switch>
                            </ScrollContainer>
                        </React.Fragment>
                    </PersistGate>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
