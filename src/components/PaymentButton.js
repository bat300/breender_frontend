import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentStepper from './transactions/PaymentStepper';
import { Modal } from 'antd';
import { useLoggedInUser } from 'helper/hooks/auth.hooks';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3),
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
    },
    modal: {
        minWidth: '60vw',
        maxWidth: '80vw',
        width: 'auto',
    },
}));

function PaymentButton({ pet }) {
    const classes = useStyles();
    const price = pet.price;
    const loggedInUser = useLoggedInUser();

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isMyPet, setIsMyPet] = useState(false);
    const wasPurchased = pet.purchased === true;

    useEffect(() => {
        if(loggedInUser) {
            setIsMyPet(loggedInUser._id === pet.ownerId)
        }
    }, []);

    const openStepper = () => setIsModalOpened(true);
    const closeModal = () => setIsModalOpened(false);

    return (
        <>
            <Button disabled={isMyPet || wasPurchased} variant="contained" color="secondary" className={classes.button} endIcon={<ShoppingCartIcon />} onClick={openStepper}>
                {wasPurchased ? 'Was Purchased' : price === 0 ? 'Free' : `${price} €` }
            </Button>
            <Modal title="Payment Confirmation" visible={isModalOpened} onCancel={closeModal} className={classes.modal} footer={null}>
                <PaymentStepper pet={pet} close={closeModal} />
            </Modal>
        </>
    );
}

export default PaymentButton;
