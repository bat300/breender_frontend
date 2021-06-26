import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(2),
  },
}));

function CircleProfileImage(props) {
  const classes = useStyles();
  return (
    <Avatar
      className={classes.large}
      src={props.imageUrl}
      alt="Pet Profile Picture"
    />
  );
}

export default CircleProfileImage;
