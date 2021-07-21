import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Loading from 'components/Loading';
import { Result } from 'antd';

const STATUS_TYPE = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const PaymentResultComponent = ({ status, transaction }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if ((status === STATUS_TYPE.SUCCESS || status === STATUS_TYPE.ERROR) && transaction?.orderNr) {
            setLoading(false);
        }
    }, [status, transaction]);

    return loading ? (
        <Loading />
    ) : status === STATUS_TYPE.SUCCESS ? (
        <Result status="success" title="Successfully Purchased!" subTitle={`Transaction number: ${transaction?.orderNr}. You can view all transactions in your profile.`} />
    ) : status === STATUS_TYPE.ERROR ? (
        <Result status="warning" title="There are some problems with your payment." />
    ) : null;
};

const useStyles = makeStyles((theme) => ({}));

export default PaymentResultComponent;
