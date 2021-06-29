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

    const [registerError, setRegisterError] = React.useState('');

    const [step, setStep] = React.useState(1);

    const values = { username, password, password2, email, province, city, isAdmin, subscriptionPlan };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    const onChangeEmail = (v) => {
        setEmail(v);
        setRegisterError('');
    };

    const onChangeUsername = (v) => {
        setUsername(v);
        setRegisterError('');
    };

    const onChangePassword = (v) => {
        setPassword(v);
        setRegisterError('');
    };

    const onChangePassword2 = (v) => {
        setPassword2(v);
        setRegisterError('');
    };

    const onChangeCity = (v) => {
        setCity(v);
        setRegisterError('');
    };

    const onChangeProvince = (v) => {
        setProvince(v);
        setRegisterError('');
    };

    function onChangeSubscriptionPlan(v)  {
        setSubscriptionPlan(v);
        setRegisterError('');
    };

    const handleChange = (input) => (event) => {
        switch (input) {
            case 'email':
                onChangeEmail(event.target.value);
                break;
            case 'username':
                onChangeUsername(event.target.value);
                break;
            case 'password':
                onChangePassword(event.target.value);
                break;
            case 'password2':
                onChangePassword2(event.target.value);
                break;
            case 'province':
                onChangeProvince(event.target.value);
                break;
            case 'city':
                onChangeCity(event.target.value);
                break;
    };
}

    function chooseStep() {
        switch (step) {
            case 1:
                return <SignUpComponent nextStep={nextStep} handleChange={handleChange} values={values}/>;
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
