import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PetInformationListItem from "./PetInformationListItem";

const useStyles = makeStyles((theme) => ({
  centered: {
    width: "90%",
    alignItems: "start",
  },
}));

function PetDocumentsList(props) {
  const classes = useStyles();

  return (
    <div className={classes.centered}>
      <Grid item>{generateDocumentItems(props.documents)}</Grid>
    </div>
  );
}

function generateDocumentItems(documents) {
  return documents.map((doc) => (
    <PetInformationListItem
      primary={doc.name}
      secondary={doc.type}
      verified={doc.verified}
      itemType="document"
    />
  ));
}

export default PetDocumentsList;
