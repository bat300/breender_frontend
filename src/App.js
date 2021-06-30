import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollContainer from './components/ScrollContainer';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './redux/reducers';
import AppTheme from './theming/themetypes';
import AppThemeOptions from './theming/themes';
import AxiosConfiguration from './helper/axios';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes';

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

    return (
        <div className={classes.appRoot}>
            <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                    <CssBaseline />
                    <React.Fragment>
                        <ScrollContainer>
                            <Routes />
                        </ScrollContainer>
                    </React.Fragment>
                    </PersistGate>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
