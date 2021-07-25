import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import premiumBanner from '../images/premium-banner.svg';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'inline-block',
        position: 'relative',
    },
    image: {
        width: '100vw',
        height: 'auto'
    },
    button: {
        position: 'absolute',
        bottom: 45,
        left: 45,
    },
}));

const PremiumBanner = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const onClick = () => history.push('/pricing');

    return (
        <div className={classes.container}>
            <img src={premiumBanner} alt="banner" className={classes.image} />
            <Button className={classes.button} variant="contained" color="primary" onClick={onClick}>Get Started</Button>
        </div>
    );
}

export default PremiumBanner;
