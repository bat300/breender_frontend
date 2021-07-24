import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SendIcon from '@material-ui/icons/Send';
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
    const [wasPurchased, setWasPurchased] = useState(false);

    useEffect(() => {
        if(loggedInUser) {
            setIsMyPet(loggedInUser._id === pet.ownerId)
            setWasPurchased(pet.purchased)
        }
    }, [loggedInUser, pet.ownerId, pet.purchased]);

    const openStepper = () => setIsModalOpened(true);
    const closeModal = () => setIsModalOpened(false);

    return (
        <>
            <Button disabled={isMyPet || wasPurchased} variant="contained" color="primary" className={classes.button} endIcon={<ShoppingCartIcon />} onClick={openStepper}>
                {wasPurchased ? 'Was Purchased' : price === 0 || price === null ? 'Free' : `${price} €` }
            </Button>
            <Modal title="Payment Confirmation" visible={isModalOpened} onCancel={closeModal} className={classes.modal} footer={null}>
                <PaymentStepper pet={pet} close={closeModal} />
            </Modal>
        </>
    );
}

export default PaymentButton;

function ContactButton(contactProps) {
    const classes = useStyles();
    const history = useHistory();

    const user = useSelector((state) => state.user);
    const handleContact = (id) => {
        history.push('/messenger/' + contactProps.breederId + '/' + contactProps.petId);
    };

    return (
        <Button variant="contained" color="primary" className={classes.button} endIcon={<SendIcon />} onClick={() => handleContact()} disabled={user.user.subscriptionPlan === 'free'}>
            Contact Breeder
        </Button>
    );
}

export { PaymentButton, ContactButton };
