import React from "react";
import { Grid } from "@material-ui/core";
import PetCompetitionsCard from "./PetCompetitionsCard";

function PetCompetitionsList(props) {
  return (
    <Grid item>
      <Grid
        container
        spacing={5}
        alignItems="center"
        justify="center"
        direction="row"
      >
        {generateCompetitionCards(props.competitions)}
      </Grid>
    </Grid>
  );
}

function generateCompetitionCards(competitions) {
  return competitions
    ? competitions.map((comp) => (
        <PetCompetitionsCard
          key={comp.name + comp.date.toString()}
          name={comp.name}
          date={comp.date}
          category={comp.category}
          prize={comp.prize}
          certificate={comp.certificate}
        />
      ))
    : null;
}

export default PetCompetitionsList;
