import React from 'react';
import SignUpComponent from './SignUpComponent';
import SubscriptionStepComponent from './SubscriptionStepComponent';
import PaymentInformation from './PaymentInformation';

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

    const [step, setStep] = React.useState(1);

    const values = { username, password, password2, email, province, city, isAdmin, subscriptionPlan };
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

    const onChangePassword = (v) => {
        setPassword(v);

    };

    const onChangePassword2 = (v) => {
        setPassword2(v);
    };

    const onChangeCity = (v) => {
        setCity(v);
    };

    const onChangeProvince = (v) => {
        setProvince(v);
    };

    function onChangeSubscriptionPlan(v)  {
        setSubscriptionPlan(v);
    };

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
            case 'emailError':
                setEmailError(event);
                break;
            case 'usernameError':
                setUsernameError(event);
                break;
    };
}

    function chooseStep() {
        switch (step) {
            case 1:
                return <SignUpComponent nextStep={nextStep} handleChange={handleChange} values={values} errors={errors}/>;
            case 2:
                return <SubscriptionStepComponent nextStep={nextStep} prevStep={prevStep} handleChange={onChangeSubscriptionPlan} subscriptionPlan={subscriptionPlan}/>;
            case 3:
            return <PaymentInformation
                    nextStep={nextStep}
                    prevStep={prevStep}
                    values={values}
                    handleChange={handleChange}
                    user={props.user}
                    onRegister={props.onRegister}
                    />
            case 4:
                return <SignUpComponent nextStep={nextStep} handleChange={onChangeSubscriptionPlan} values={values}/>;
        }
    }

    return chooseStep();
}

export default SignUpPaper;
