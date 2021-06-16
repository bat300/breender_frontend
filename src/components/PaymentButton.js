import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
}));

function PaymentButton(props) {
  const classes = useStyles();

  //TODO: The button needs to have payment funcitonality
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      endIcon={<ShoppingCartIcon />}
    >
      € {props.price}
    </Button>
  );
}

export default PaymentButton;
