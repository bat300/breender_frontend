import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography, Grid } from '@material-ui/core';

import logo from '../images/breender.svg';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonIcon from '@material-ui/icons/Person';
import KebabMenu from './KebabMenu';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    toolbar: {
        flexGrow: 1,
    },
    title: {
        paddingLeft: theme.spacing(2),
        cursor: 'pointer',
        fontWeight: 'lighter',
        '&:hover': {
            color: 'inherit',
            textDecoration: 'none',
            fontWeight: 'normal',
        },
    },
    title2: {
        paddingLeft: theme.spacing(),
        fontWeight: 'lighter',
    },
    logo: {
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    navigation: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch',
    },
}));

/**
 * Navigation bar of the app
 * @param {props} props
 */
function Header(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.user);

    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [navigationSelectedStyle, setNavigationSelectedStyle] = React.useState({ search: null, blog: null, premium: null });

    useEffect(() => {
        // @TODOs
        switch (props.history.location.pathname) {
            case '/':
                setNavigationSelectedStyle({ search: { fontWeight: 'normal' }, blog: null, premium: null }); break;
            case '/premium':
                setNavigationSelectedStyle({ search: null, blog: null, premium: { fontWeight: 'normal' } }); break;
            default:
                setNavigationSelectedStyle({ search: null, blog: null, premium: null }); break;
        }
    }, [props.history.location.pathname]);

    const goToHome = () => props.history.push('/');
    // @TODOs
    const goToBlog = () => props.history.push('/');
    
    const onClickAdminConsole = () => {
        props.history.push('/admin-console');
    };
    const onClickPremium = () => {
        props.history.push('/premium');
    };

    return (
        <AppBar position="sticky">
            <KebabMenu open={Boolean(menuAnchor)} anchor={menuAnchor} onClose={() => setMenuAnchor(null)} />
            <Toolbar className={classes.toolbar}>
                <div onClick={goToHome} className={classes.logo}>
                    <img src={`${logo}#svgView(preserveAspectRatio(xMaxYMax))`} height="55px" style={{ cursor: 'pointer' }} />
                </div>
                <div className={classes.root}>
                    <Typography noWrap variant="h5" color="inherit" style={{ cursor: 'pointer', overflow: 'visible' }} onClick={goToHome}>
                        Find a mate
                    </Typography>
                    <Typography className={classes.title2} variant="h5" color="inherit">
                        |
                    </Typography>
                    <Typography className={classes.title2} variant="h5" color="inherit" style={{ cursor: 'pointer' }} onClick={goToBlog}>
                        Blog
                    </Typography>
                    <Typography className={classes.title2} variant="h5" color="inherit">
                        |
                    </Typography>
                    <Typography
                        className={user.user ? (user.user.role === 'admin' ? classes.title2 : classes.title) : classes.title}
                        variant="h5"
                        color="inherit"
                        style={{ cursor: 'pointer' }}
                        onClick={onClickPremium}
                    >
                        Premium
                    </Typography>
                    {user.user ? (
                        user.user.role === 'admin' ? (
                            <Grid container direction="row">
                                <Typography className={classes.title2} variant="h5" color="inherit">
                                    |
                                </Typography>
                                <Typography className={classes.title2} variant="h5" color="inherit" style={{ cursor: 'pointer' }} onClick={onClickAdminConsole}>
                                    Admin Console
                                </Typography>
                            </Grid>
                        ) : null
                    ) : null}
                </div>
                <IconButton color="inherit">
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)} color="inherit">
                    <PersonIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);
