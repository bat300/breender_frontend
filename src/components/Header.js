import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography, Badge } from '@material-ui/core';
import logo from '../images/breender.svg';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import KebabMenu from './KebabMenu';
import { useSelector } from 'react-redux';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

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
    const unseenMessages = useSelector((state) => state.messages.unseenMessages);

    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const [navigationSelectedStyle, setNavigationSelectedStyle] = React.useState({ search: null, blog: null, premium: null, admin: null });

    useEffect(() => {
        // @TODOs
        switch (props.history.location.pathname) {
            case '/':
                setNavigationSelectedStyle({ search: { fontWeight: 'normal' }, blog: null, premium: null, admin: null });
                break;
            case '/pricing':
                setNavigationSelectedStyle({ search: null, blog: null, premium: { fontWeight: 'normal' }, admin: null });
                break;
            case '/blog':
                setNavigationSelectedStyle({ search: null, blog: { fontWeight: 'normal' }, premium: null, admin: null });
                break;
            case '/admin-console':
                setNavigationSelectedStyle({ search: null, blog: null, premium: null, admin: { fontWeight: 'normal' } });
                break;
            default:
                setNavigationSelectedStyle({ search: null, blog: null, premium: null, admin: null });
                break;
        }
    }, [props.history.location.pathname]);

    const goToHome = () => props.history.push('/');
    const onClickAdminConsole = () => props.history.push('/admin-console');
    const onClickPremium = () => props.history.push('/pricing');
    const goToBlog = () => props.history.push('/blog');

    const onClickMessenger = () => {
        props.history.push('/messenger');
    };
    const scrollTrigger = useScrollTrigger();

    useEffect(() => {
        const headerHeight = document.querySelector('#header').clientHeight;
        document.querySelector('#top-anchor').style.height = '' + headerHeight + 'px';
    }, []);

    return (
        <div>
            <Slide appear={false} direction="down" in={!scrollTrigger}>
                <AppBar id="header">
                    <KebabMenu open={Boolean(menuAnchor)} anchor={menuAnchor} onClose={() => setMenuAnchor(null)} />
                    <Toolbar className={classes.toolbar}>
                        <div onClick={goToHome} className={classes.logo}>
                            <img src={`${logo}#svgView(preserveAspectRatio(xMaxYMax))`} height="55px" style={{ cursor: 'pointer' }} />
                        </div>
                        <div className={classes.root}>
                            <Typography className={classes.title} variant="h5" color="inherit" onClick={goToHome} style={navigationSelectedStyle.search}>
                                Find a mate
                            </Typography>
                            <Typography className={classes.title2} variant="h5" color="inherit">
                                |
                            </Typography>
                            <Typography className={classes.title} variant="h5" color="inherit" onClick={goToBlog} style={navigationSelectedStyle.blog}>
                                Blog
                            </Typography>
                            <Typography className={classes.title2} variant="h5" color="inherit">
                                |
                            </Typography>
                            <Typography className={classes.title} variant="h5" color="inherit" style={navigationSelectedStyle.premium} onClick={onClickPremium}>
                                Pricing
                            </Typography>
                            {user.user ? (
                                user.user.role === 'admin' ? (
                                    <>
                                        <Typography className={classes.title2} variant="h5" color="inherit">
                                            |
                                        </Typography>
                                        <Typography className={classes.title} variant="h5" color="inherit" onClick={onClickAdminConsole} style={navigationSelectedStyle.admin}>
                                            Admin Console
                                        </Typography>
                                    </>
                                ) : null
                            ) : null}
                        </div>
                        <IconButton onClick={onClickMessenger} color="inherit">
                            {unseenMessages ? (
                                unseenMessages.map((m) => m.count).reduce((c1, c2) => c1 + c2, 0) !== 0 ? (
                                    <Badge badgeContent={unseenMessages.map((m) => m.count).reduce((c1, c2) => c1 + c2, 0)} color="secondary">
                                        <ChatIcon />
                                    </Badge>
                                ) : (
                                    <ChatBubbleOutlineIcon />
                                )
                            ) : (
                                <ChatBubbleOutlineIcon />
                            )}
                        </IconButton>
                        <IconButton onClick={(event) => setMenuAnchor(event.currentTarget)} color="inherit">
                            <PersonIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Slide>
        </div>
    );
}

export default withRouter(Header);
