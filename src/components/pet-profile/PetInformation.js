import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PetInformationListItem from "./PetInformationListItem";
import { Grid, List } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    flex: 1,
    maxWidth: "100%",
  },
  helf: {
    width: "50%",
  },
}));

function PetInformation(props) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Grid
        container
        direction="row"
        align="center"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <List>
            <PetInformationListItem
              primary={props.officialName}
              secondary={"Name"}
            />
            <PetInformationListItem
              primary={props.nickname}
              secondary={"Nickname"}
            />
            <PetInformationListItem
              primary={props.ownerId}
              secondary={"Owner"}
              itemType={"owner"}
              //TODO: This needs to have the real avatar
              avatar={
                "https://image.stern.de/30558644/t/e9/v3/w1440/r1.7778/-/donald-trump.jpg"
              }
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          <List>
            <PetInformationListItem primary={props.breed} secondary={"Breed"} />
            <PetInformationListItem primary={"3 years old"} secondary={"Age"} />
            <PetInformationListItem primary={props.sex} secondary={"Sex"} />
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default PetInformation;
