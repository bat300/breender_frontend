import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { getAdminTransactions } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import TransactionsAdminOverviewTable from 'components/transactions/TransactionsAdminOverviewTable';
import VerifyDocumentList from '../components/VerifyDocumentsList';
import { Typography } from '@material-ui/core';

const AdminConsoleView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useUser();
    const transactions = useSelector((state) => state.transaction.transactions);

    useEffect(() => {
        dispatch(getAdminTransactions(user.id));
    }, [transactions.length, user.id, dispatch]);

    return (
        <div className={classes.layout}>
            <div className={classes.childLayout}>
                <Typography variant="h4" align="left" style={{ fontWeight: 'lighter' }}>
                    Documents to verify
                </Typography>
                <VerifyDocumentList />
            </div>
            <div className={classes.childLayout}>
                <Typography variant="h4" align="left" style={{ fontWeight: 'lighter', marginBottom: 50 }}>
                    Manage transactions
                </Typography>
                <TransactionsAdminOverviewTable transactions={transactions} />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    childLayout: {
        width: '90vw',
        marginTop: 50,
    },
    layout: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
}));

export default connect()(withRouter(AdminConsoleView));
