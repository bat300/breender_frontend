import { AppTheme } from './themetypes';

const themeindependent = {
    mixins: {
        textfieldminheight: '38px',
    },
};

const appThemeOptions = {
    [AppTheme.LIGHT]: {
        palette: {
            type: 'light',
            primary: {
                main: '#F4F1DE',
            },
            secondary: {
                main: '#81B29A',
            },
            ternary: {
                main: 'E07A5F',
            },
            background: {
                paper: '#fff',
                default: '#fafafa',
            },
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
