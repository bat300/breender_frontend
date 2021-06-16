import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Divider, Typography } from "@material-ui/core";
import PetPhotos from "./PetPhotos";
import PetInformation from "./PetInformation";
import PetCompetitionsList from "./PetCompetitionsList";
import PetDocumentsList from "./PetDocumentsList";
import PaymentButton from "../../components/PaymentButton";

/**
 * Manages the process of getting pet details data
 * @param {props} props
 */

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "80%",
    alignSelf: "center",
  },
  maxWidth: {
    width: "100%",
  },
  centered: {
    width: "50%%",
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  cards: {
    margin: theme.spacing(2),
  },
  leftTypography: {
    width: "100%",
    alignItems: "start",
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
  },
  spacedDivider: {
    width: "90%",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  gridMargin: {
    marginTop: theme.spacing(2),
  },
}));

function PetProfileComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Grid container spacing={2}>
        <Grid item className={classes.maxWidth}>
          <Paper className={classes.paper}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="row"
              className={classes.gridMargin}
              spacing={2}
            >
              <Grid item className={classes.centered}>
                <Typography variant="h4" align="center">
                  {props.officialName}
                </Typography>
                <PetPhotos
                  pictures={props.pictures}
                  profilePicture={props.profilePicture}
                />

                <div className={classes.centered}>
                  <PaymentButton price={props.price} />
                </div>
              </Grid>
              <Divider variant="middle" />
              <Grid item className={classes.centered}>
                <PetInformation
                  officialName={props.officialName}
                  nickname={props.nickname}
                  birthDate={props.birthDate}
                  sex={props.sex}
                  price={props.price}
                  breed={props.breed}
                  species={props.species}
                  ownerId={props.ownerId}
                />
              </Grid>
            </Grid>
            <Divider variant="middle" />

            <PetOptionalInformation
              ownerId={props.ownerId}
              documents={props.documents}
              competitions={props.competitions}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function LeftTypography(props) {
  const classes = useStyles();

  return (
    <div className={classes.leftTypography}>
      <Typography variant="h6">{props.text}</Typography>
    </div>
  );
}

function PetOptionalInformation(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      direction="column"
      className={classes.gridMargin}
      spacing={2}
    >
      <LeftTypography text="Competitions:" />
      <PetCompetitionsList
        competitions={props.competitions}
        ownerId={props.ownerId}
      />

      <Divider variant="middle" className={classes.spacedDivider} />

      <LeftTypography text="Documents:" />
      <PetDocumentsList documents={props.documents} ownerId={props.ownerId} />
    </Grid>
  );
}

export default PetProfileComponent;
