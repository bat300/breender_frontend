import { AppTheme } from './themetypes';

const themeindependent = {
    mixins: {
        textfieldminheight: '38px',
    },
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    body: {
                        background: 'linear-gradient(180deg, rgba(97, 102, 174, 0.3) 0%, rgba(255, 225, 117, 0.3) 50%, rgba(255, 184, 0, 0.3) 100%)',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                    },
                },
            },
        },
        palette: {
            type: 'light',
            primary: {
                main: '#7D7F9A',
                light: '#D2D3DA',
                dark: '#3E4059',
            },
            card: {
                main: '#70739A',
            },
            secondary: {
                main: '#D37F65',
                light: '#F3F1E0',
            },
            ternary: {
                main: '#E07A5F',
            },
            background: {
                paper: '#fff',
                default: 'rgba(52, 57, 109, 0.1)',
            },
            textPrimary: '#222330',
            textSecondary: 'white',
        },
        typography: {
            body1: {
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 'lighter',
                color: '#222330',
            },
            h5: {
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 500,
                color: '#222330',
            },
            h4: {
                fontWeight: 'lighter',
            }
        },
        ...themeindependent,
    },
    [AppTheme.DARK]: {
        palette: {
            type: 'dark',
            primary: {
                main: '#3D405B',
            },
            secondary: {
                main: '#81B29A',
            },
            background: {
                paper: '#303030',
                default: '#000',
            },
        },
        ...themeindependent,
    },
};

export default appThemeOptions;
