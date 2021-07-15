import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepConnector from '@material-ui/core/StepConnector';
import { Check } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Confirm general information', 'Confirm payment', 'Finish'];
}

const PaymentStepper = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <div>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
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

export default PaymentStepper;
