import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Lightbox from "react-lightbox-component";
import "react-lightbox-component/build/css/index.css";
import CircleProfileImage from "../../components/CircleProfileImage";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    flex: 1,
    margin: 10,
  },
}));

function PetPhotos(props) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Grid container alignItems="center" justify="center" direction="column">
        <CircleProfileImage imageUrl={props.profilePicture} />
        <Lightbox images={props.pictures} showImageModifiers={false} />
      </Grid>
    </div>
  );
}

export default PetPhotos;
