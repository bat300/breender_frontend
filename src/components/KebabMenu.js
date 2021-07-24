import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getTransactions, getUsersInfo, logout } from '../redux/actions';
import { Menu, MenuItem, Avatar, Divider } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useUser } from 'helper/hooks/auth.hooks';
import SecurityIcon from '@material-ui/icons/Security';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles((theme) => ({
    menuitem: {
        display: 'flex',
        minWidth: '200px',
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
}));
/**
 * Menu for user managment
 * @param {props} props
 */
function KebabMenu(props) {
    const classes = useStyles();
    // return the currnetly logged in user from redux store
    const user = useUser();
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        if (user) {
            props.dispatch(getUsersInfo(user.id));
        }
    }, [user]);

    const onClickLogin = () => {
        // close this menu
        props.onClose();
        // navigate to the login page
        props.history.push('/login');
    };

    const onClickLogout = () => {
        // trigger redux logout action
        props.dispatch(logout());
        // close this menu
        props.onClose();
        // navigate to the home page
        props.history.push('/login');
    };

    const onClickGoToUserProfile = () => {
        props.history.push('/user');
    };

    const onClickMyTransactions = (id) => {
        props.dispatch(getTransactions(id));
        props.history.push('/transactions');
    };

    return (
        <Menu
            open={props.open}
            anchorEl={props.anchor}
            onClose={props.onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            {userInfo
                ? [
                      <MenuItem key="user" className={classes.menuitem} onClick={onClickGoToUserProfile}>
                          <Avatar className={classes.avatar}>{userInfo.username ? userInfo.username[0] : ''}</Avatar>
                          {user.username}
                          {userInfo.role === 'admin' ? (
                              <SecurityIcon style={{ paddingLeft: '4px', fill: 'green' }} />
                          ) : userInfo.subscriptionPlan === 'premium' ? (
                              <FontAwesomeIcon icon={faCrown} size={"lg"} style={{ paddingLeft: '6px', color: 'green' }} />
                          ) : (
                              <></>
                          )}
                      </MenuItem>,
                      <Divider key="divider" />,
                      <MenuItem key="transactions" onClick={() => onClickMyTransactions(user.id)} className={classes.menuitem}>
                          My transactions
                      </MenuItem>,
                      <Divider key="divider2" />,
                      <MenuItem key="logout" onClick={onClickLogout} className={classes.menuitem}>
                          <ExitToAppIcon className={classes.avatar} />
                          Logout
                      </MenuItem>,
                  ]
                : [
                      <MenuItem key="login" onClick={onClickLogin} className={classes.menuitem}>
                          <VerifiedUserIcon className={classes.avatar} />
                          Login
                      </MenuItem>,
                  ]}
        </Menu>
    );
}

// attributes of props and their type
KebabMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    anchor: PropTypes.element,
    open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(KebabMenu));
