import React from 'react';
import SignUpComponent from './SignUpComponent';
import SubscriptionStepComponent from './SubscriptionStepComponent';
import PaymentInformationComponent from './PaymentInformation';

function SignUpPaper(props) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [province, setProvince] = React.useState('');
    const [city, setCity] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    // if user comes from premium page, set plan to selected; if from login , set plan to free
    const [subscriptionPlan, setSubscriptionPlan] = React.useState(props.subscriptionPlan? props.subscriptionPlan : 'free');

    const [emailError, setEmailError] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');
    //registration step
    const [step, setStep] = React.useState(1);


    const payments = [
        { description: '4.99€ for 1 month', plan: '1mo', price: '4.99' },
        { description: '12,99€ for 3 months', plan: '3mo', price: '12.99' },
        { description: '22,99€ for 6 months', plan: '6mo', price: '22.99' },
        { description: '34,99€ for 1 year', plan: '1yr', price: '34.99' },
    ];

    const [chosenPayment, setChosenPayment] = React.useState('4.99');
    const values = { username, password, password2, email, province, city, isAdmin, subscriptionPlan, chosenPayment};
    const errors = {emailError, usernameError};

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    const onChangeEmail = (v) => {
        setEmailError('');
        setEmail(v);
    };

    const onChangeUsername = (v) => {
        setUsernameError('');
        setUsername(v);

    };

    const onChangeIsAdmin = (v) => {
        if(emailError.indexOf('admin') >= 0 && !v) {
            setEmailError('');
        }
        setIsAdmin(v);
    }

    function onChangeSubscriptionPlan(v)  {
        setSubscriptionPlan(v);
    };

    //change state dependent on the input value
    function handleChange  (input,event) {
        switch (input) {
            case 'email':
                onChangeEmail(event.target.value);
                break;
            case 'username':
                onChangeUsername(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
            case 'password2':
                setPassword2(event.target.value);
                break;
            case 'province':
                setProvince(event.target.value);
                break;
            case 'city':
                setCity(event.target.value);
                break;
            case 'isAdmin':
                onChangeIsAdmin(event.target.checked);
                break;
            case 'emailError':
                setEmailError(event);
                break;
            case 'usernameError':
                setUsernameError(event);
                break;
            case 'chosenPayment':
                setChosenPayment(event.target.value);
    };
}
    //choose registration step
    function chooseStep() {
        switch (step) {
            case 1:
                return <SignUpComponent nextStep={nextStep} handleChange={handleChange} onCancel={props.onCancel} values={values} errors={errors}/>;
            case 2:
                return <SubscriptionStepComponent onRegister={props.onRegister} nextStep={nextStep} prevStep={prevStep} handleChange={onChangeSubscriptionPlan} values={values} subscriptionPlan={subscriptionPlan}/>;
            case 3:
            return <PaymentInformationComponent
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={values}
                    handleChange={handleChange}
                    payments={payments}
                    onRegister={props.onRegister}
                    user={props.user}
                    />
        }
    }

    return chooseStep();
}

export default SignUpPaper;
