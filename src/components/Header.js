import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@material-ui/core';

import logo from '../images/breender.svg';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonIcon from '@material-ui/icons/Person';
import KebabMenu from './KebabMenu';

const useStyles = makeStyles((theme) => ({
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
        paddingLeft: theme.spacing(2),
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
    const goToPremium = () => props.history.push('/');

    return (
        <AppBar position="sticky">
            <KebabMenu open={Boolean(menuAnchor)} anchor={menuAnchor} onClose={() => setMenuAnchor(null)} />
            <Toolbar className={classes.toolbar}>
                <div onClick={goToHome} className={classes.logo}>
                    <img src={`${logo}#svgView(preserveAspectRatio(xMaxYMax))`} height="55px" style={{ cursor: 'pointer' }} />
                </div>
                <div className={classes.navigation}>
                    <Link className={classes.title} variant="h5" color="inherit" onClick={goToHome} style={navigationSelectedStyle.search}>
                        Find a mate
                    </Link>
                    <Typography className={classes.title2} variant="h5" color="inherit">
                        |
                    </Typography>
                    <Link className={classes.title} variant="h5" color="inherit" onClick={goToBlog} style={navigationSelectedStyle.blog}>
                        Blog
                    </Link>
                    <Typography className={classes.title2} variant="h5" color="inherit">
                        |
                    </Typography>
                    <Link className={classes.title} variant="h5" color="inherit" onClick={goToPremium} style={navigationSelectedStyle.premium}>
                        Premium
                    </Link>
                </div>
                <IconButton onClick={goToHome} color="inherit">
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
