import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

import logo from '../images/breender.svg';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PersonIcon from '@material-ui/icons/Person';
import KebabMenu from './KebabMenu';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2),
    },
    title2: {
        paddingLeft: theme.spacing(2),
    },
    logo: {
        flexGrow: 1,
        alignItems: 'flex-start',
    },
}));

/**
 * Navigation bar of the app
 * @param {props} props
 */
function Header(props) {
    const classes = useStyles();

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const onClickLogo = () => {
        props.history.push('/');
    };

    const onClickPremium = () => {
        props.history.push('/premium');
    };

    return (
        <AppBar position="sticky">
            <KebabMenu open={Boolean(menuAnchor)} anchor={menuAnchor} onClose={() => setMenuAnchor(null)} />
            <Toolbar className={classes.toolbar}>
                <div onClick={onClickLogo} className={classes.logo}>
                    <img src={`${logo}#svgView(preserveAspectRatio(xMaxYMax))`} height="55px" style={{ cursor: 'pointer' }} />
                </div>
                <Typography className={classes.title2} variant="h5" color="inherit" style={{ cursor: 'pointer' }}>
                    Find a mate
                </Typography>
                <Typography className={classes.title2} variant="h5" color="inherit">
                    |
                </Typography>
                <Typography className={classes.title2} variant="h5" color="inherit" style={{ cursor: 'pointer' }}>
                    Blog
                </Typography>
                <Typography className={classes.title2} variant="h5" color="inherit">
                    |
                </Typography>
                <Typography className={classes.title} variant="h5" color="inherit" style={{ cursor: 'pointer' }} onClick={onClickPremium}>
                    Premium
                </Typography>
                <IconButton onClick={onClickLogo} color="inherit">
                    <SearchIcon />
                </IconButton>
                <IconButton onClick={onClickLogo} color="inherit">
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
