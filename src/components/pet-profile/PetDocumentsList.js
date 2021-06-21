import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PetInformationListItem from "./PetInformationListItem";

const useStyles = makeStyles((theme) => ({
  centered: {
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
  return documents
    ? documents.map((doc) => (
        <PetInformationListItem
          primary={doc.name}
          secondary={doc.type}
          verified={doc.verified}
          url={doc.url}
          itemType="document"
        />
      ))
    : null;
}

export default PetDocumentsList;
