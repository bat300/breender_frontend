import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import StepConnector from '@material-ui/core/StepConnector';
import { Check } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import StepperInformation from './StepperInformation';
import { useLoggedInUser, useSelectedUser } from 'helper/hooks/auth.hooks';
import PaymentResultComponent from './PaymentResult';
import { useDispatch, useSelector } from 'react-redux';
import { changePet, createTransaction, getPet } from 'redux/actions';
import { NotificationService } from 'services';

const STATUS_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const PaymentStepper = ({ pet, close }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const transaction = useSelector((state) => state.transaction.transaction);
    const petOwner = useSelectedUser();
    const loggedInUser = useLoggedInUser();

    const [paymentStatus, setPaymentStatus] = useState('none');
    const [activeStep, setActiveStep] = useState(0);
    const [isFreeOfCharge, setIsFreeOfCharge] = useState(pet.price === 0 || pet.price === null); // if pet is free

    const steps = ['Confirm general information', 'Confirm payment', 'Finish'];


    useEffect(() => {
        if (loggedInUser) {
            setIsFreeOfCharge(pet.price === 0 || pet.price === null) // premium user don't need to pay any fees for the free pet
        }
    }, [loggedInUser, pet.ownerId, pet.price, dispatch])


    const isButtonDisabled = activeStep === 1 && !isFreeOfCharge;

    // helper functions for the transaction generation
    const calculateFee = () => {
        if (petOwner.subscriptionPlan === 'free') {
            let fee = Math.min(pet.price * 0.05, 20); // 5% of the pet price or maximum 20€ as fee
            fee = Math.max(fee, 1); // min 1€
            return fee;
        }
        return 0;
    };
    // generate order number for new transactions
    const generateId = () => Math.floor(Math.random() * 10000000000).toString(16);
    const transactionData = {
        orderNr: generateId(),
        senderId: loggedInUser._id,
        receiverId: pet.ownerId,
        pet: pet.id,
        createdAt: new Date(),
        senderResponse: 'pending',
        receiverResponse: 'pending',
        status: 'pending',
        amount: pet.price ? pet.price : 0,
        fee: calculateFee(),
        processed: false,
        reminderSent: false,
    };

    // handle next step
    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            close();
            setActiveStep(0);
            return;
        }
        // skip payment and create transaction directly
        if (isFreeOfCharge && activeStep === 1) {
            onApprove();
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // go one step back
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // main function for approval and transaction creation
    const onApprove = async () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        await dispatch(
            createTransaction(
                transactionData,
                () => {
                    NotificationService.notify('success', 'Transaction Created', 'Transaction was successfully created');
                    setPaymentStatus(STATUS_TYPE.SUCCESS);

                    // update pet status to purchased
                    let newPet = { ...pet, purchased: true };
                    dispatch(changePet(newPet));
                    dispatch(getPet(pet.id));
                },
                () => {
                    NotificationService.notify('error', 'Transaction Error', 'Error occurred during transaction creation');
                    setPaymentStatus(STATUS_TYPE.ERROR);
                }
            )
        );
    };

    // error handling
    const onError = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setPaymentStatus(STATUS_TYPE.ERROR);
    };

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <StepperInformation petOwner={petOwner} pet={pet} loggedInUser={loggedInUser} step={0} isFreeOfCharge={isFreeOfCharge} onApprove={onApprove} onError={onError} />;
            case 1:
                return <StepperInformation petOwner={petOwner} pet={pet} loggedInUser={loggedInUser} step={1} isFreeOfCharge={isFreeOfCharge} onApprove={onApprove} onError={onError} />;
            case 2:
                return <PaymentResultComponent status={paymentStatus} transaction={transaction} />;
            default:
                return 'Unknown stepIndex';
        }
    };

    return (
        <div className={classes.root}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<AlternativeConnector />}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel StepIconComponent={StepIcon} {...labelProps}>
                                {label}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? null : (
                    <div>
                        {getStepContent(activeStep)}
                        <div>
                            <Button disabled={activeStep === 0 || activeStep === 2} onClick={handleBack} className={classes.button} variant="contained" color="primary">
                                Back
                            </Button>
                            <Button disabled={isButtonDisabled} variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * This function are used for the alternative styling of the stepper.
 */
const AlternativeConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#D37F65',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#D37F65',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 2,
        borderRadius: 1,
    },
})(StepConnector);

const useStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#D37F65',
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#D37F65',
        zIndex: 1,
        fontSize: 18,
    },
});

function StepIcon(props) {
    const classes = useStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

StepIcon.propTypes = {
    active: PropTypes.bool, // Whether this step is active.
    completed: PropTypes.bool, // Mark the step as completed. Is passed to child components.
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
}));

export default PaymentStepper;
