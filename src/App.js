import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollContainer from './components/ScrollContainer';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './redux/reducers';
import AppTheme from './theming/themetypes';
import AppThemeOptions from './theming/themes';
import AxiosConfiguration from './helper/axios';
import Routes from './routes';
import { LocalStorageService } from 'services';

const useStyles = makeStyles((theme) => ({
    appRoot: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
}));

function App() {
    const classes = useStyles();

    useEffect(() => AxiosConfiguration.setupInterceptors(), []);

    // set document title
    useEffect(() => {
        document.title = 'Breender App';
    }, []);

    // create store for redux
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);

    return (
        <div className={classes.appRoot}>
            <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
                <Provider store={store}>
                    <CssBaseline />
                    <React.Fragment>
                        <ScrollContainer>
                            <Routes />
                        </ScrollContainer>
                    </React.Fragment>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
