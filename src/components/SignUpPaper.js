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
        { price: '4.99 €/mo', renewalFrequency: '1mo', plan_id: 'P-5CE276523D561035MMDTPVSY' },
        { price: '12,99 €/3mo', renewalFrequency: '3mo', plan_id: 'P-8VR66594BC768200LMDTPT2A' },
        { price: '22,99 €/6mo', renewalFrequency: '6mo', plan_id: 'P-9GV20034R8618241EMDTPUSI' },
        { price: '35,99 €/yr', renewalFrequency: '1yr', plan_id: 'P-7HH647296G2018315MDTPWEY' },
    ];

    const [chosenPayment, setChosenPayment] = React.useState('P-5CE276523D561035MMDTPVSY');
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
                setIsAdmin(event.target.checked);
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
