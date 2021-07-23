import React from "react";
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import NewReleasesTwoToneIcon from "@material-ui/icons/NewReleasesTwoTone";
import { makeStyles } from "@material-ui/core";

export const VerificationIcon = (props) => {
    const classes = useStyles();
  return props.verified ? <VerifiedUserTwoToneIcon className={classes.success} /> : <NewReleasesTwoToneIcon className={classes.warning} />
}


export const CancelIcon = () => {
    const classes = useStyles();
    return <CancelTwoToneIcon className={classes.error} />;
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
