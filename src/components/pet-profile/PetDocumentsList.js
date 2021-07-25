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
          key={doc.name + doc.type}
          primary={doc.name}
          secondary={'Additional Document'}
          verified={doc.verified}
          declined={doc.declined}
          url={doc.url}
          itemType="document"
        />
      ))
    : null;
}

export default PetDocumentsList;
