import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SendIcon from '@material-ui/icons/Send';

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
        <Button variant="contained" color="secondary" className={classes.button} endIcon={<ShoppingCartIcon />}>
            € {props.price}
        </Button>
    );
}

function ContactButton(contactProps) {
    const classes = useStyles();
    const history = useHistory();

    const user = useSelector((state) => state.user);
    const handleContact = (id) => {
        history.push('/messenger/' + contactProps.breederId + '/' + contactProps.petId);
    };

    return (
        <Button variant="contained" color="secondary" className={classes.button} endIcon={<SendIcon />} onClick={() => handleContact()} disabled={user.user.subscriptionPlan !== 'free'}>
            Contact Breeder
        </Button>
    );
}

export { PaymentButton, ContactButton };
