import React from "react";
import CancelIcon from '@material-ui/icons/Cancel';
import Icon from "@material-ui/core/Icon";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import { makeStyles } from "@material-ui/core";

export const VerificationIcon = (props) => {
    const classes = useStyles();
  return props.verified ? <VerifiedUserIcon className={classes.success} /> : <NewReleasesIcon className={classes.warning} />
}


export const CancelationIcon = () => {
    const classes = useStyles();
    return <CancelIcon className={classes.error} />;
};

const useStyles = makeStyles((theme) => ({
    success: {
        width: 35,
        height: 35,
        color: '#C0E189',
    },
    warning: {
        width: 35,
        height: 35,
        color: '#F9C339',
    },
    error: {
        width: 35,
        height: 35,
        color: '#F96149',
    },
}));
