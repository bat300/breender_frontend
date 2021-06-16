import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Icon,
  Button,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VerificationIcon from "../../components/VerificationIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function PetCompetitionsCard(props) {
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={classes.root}>
        <CardHeader
          action={<VerificationIcon verified={props.certificate.verified} />}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.category}
          </Typography>
          <Typography variant="body2" component="p">
            {props.prize}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<GetAppIcon />}
          >
            Certificate
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default PetCompetitionsCard;
