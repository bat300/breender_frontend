import React from "react";
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import NewReleasesTwoToneIcon from "@material-ui/icons/NewReleasesTwoTone";
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import { makeStyles } from "@material-ui/core";

export const VerificationIcon = (props) => {
    const classes = useStyles();
  return props.verified ? <VerifiedUserTwoToneIcon className={classes.success} {...props} /> : <NewReleasesTwoToneIcon className={classes.warning} {...props} />
}

export const CheckIcon = (props) => {
    const classes = useStyles();
    return <CheckCircleTwoToneIcon className={classes.success} {...props} />;
};

export const CancelIcon = (props) => {
    const classes = useStyles();
    return <CancelTwoToneIcon className={classes.error} {...props} />;
};

const useStyles = makeStyles((theme) => ({
    success: {
        width: 30,
        height: 30,
        color: '#C0E189',
    },
    warning: {
        width: 30,
        height: 30,
        color: '#F9C339',
    },
    error: {
        width: 30,
        height: 30,
        color: '#F96149',
    },
}));
