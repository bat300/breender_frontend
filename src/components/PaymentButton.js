import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3),
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
    },
}));

function PaymentButton(props) {
    const classes = useStyles();
    const price = props.price;

    //TODO: The button needs to have payment funcitonality
    return (
        <Button variant="contained" color="secondary" className={classes.button} endIcon={<ShoppingCartIcon />}>
           {price === 0 ? 'Free' : `${price} €`}
        </Button>
    );
}

export default PaymentButton;
