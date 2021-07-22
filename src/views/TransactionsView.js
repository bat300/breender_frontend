import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { getTransactions } from 'redux/actions';
import { useLoggedInUser, useUser } from 'helper/hooks/auth.hooks';
import Loading from 'components/Loading';
import TransactionsOverviewTable from 'components/transactions/TransactionsOverviewTable';
import PremiumBanner from 'components/PremiumBanner';
import { showPremiumBanner } from 'helper/helpers';

/**
 * Overview for all transactions
 * @param {*} props
 * @returns
 */

const TransactionsView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loggedInUser = useLoggedInUser();

    const user = useUser();
    const transactions = useSelector((state) => state.transaction.transactions);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getTransactions(user.id));
    }, [transactions.length, user.id, dispatch]);

    useEffect(() => {
        let loading = true;

        const load = async () => {
            if (!loading) return;
            setLoading(false);
        };

        load();

        return () => {
            loading = false;
        };
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            {showPremiumBanner(loggedInUser) ? <PremiumBanner /> : null}
            <div className={classes.layout}>
                <Typography variant="h6" align="left">
                    Transactions
                </Typography>
                <TransactionsOverviewTable transactions={transactions} />
            </div>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        justifyContent: 'center',
        paddingTop: 50,
        paddingLeft: 100,
        paddingRight: 100,
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
}));

// connect() establishes the connection to the redux functionalities
export default connect()(TransactionsView);
