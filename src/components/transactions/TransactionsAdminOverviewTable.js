import React, { useEffect } from 'react';
// antd imports
import { Table } from 'antd';
import '../../theming/antd.css';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import PetPreviewProfileComponent from 'components/pet-profile/PetPreviewProfileComponent';
import PriceTag from 'components/PriceTag';
import { getAdminTransactions, updateTransaction } from 'redux/actions';
import moment from 'moment';
import { Chip } from '@material-ui/core';
import AdminStatusTag from 'components/tags/AdminStatusTag';
import Loading from 'components/Loading';

const TransactionsAdminOverviewTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transaction.transactions);

    // states
    const checkRequiresInvestigation = (t) => (t.senderResponse === 'fail' && t.receiverResponse === 'success') || (t.senderResponse === 'success' && t.receiverResponse === 'fail');

    useEffect(() => {
        
           if (props.active) { //get transactions when tab is opened
            dispatch(getAdminTransactions(props.user.id)); 
            
        }       
    }, [props, dispatch])



    // update transaction on confirming to change the transaction status
    const confirm = async (transaction) => {
        await dispatch(updateTransaction(transaction));
        await dispatch(getAdminTransactions(props.user.id));
    };

    // get the owner of the pet
    const getPetOwner = (transaction) => {
        if (transaction.pet?.ownerId === transaction.senderId?._id) {
            return transaction.senderId;
        } else {
            return transaction.receiverId;
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'orderNr',
            key: 'orderNr',
            render: (id) => <p>{String(id).toUpperCase()}</p>,
        },
        {
            title: 'MATE',
            dataIndex: 'pet',
            key: 'pet',
            align: 'center',
            render: (_, record) => <PetPreviewProfileComponent username={getPetOwner(record).username} pet={record.pet} />,
        },
        {
            title: 'AMOUNT',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            render: (_, record) => <PriceTag price={record.amount} fee={record.fee} />,
        },
        {
            title: 'DEADLINE',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            render: (deadline) => <div>{String(moment(deadline).format('LLL'))}</div>,
        },
        {
            title: 'SENDER RESPONSE',
            key: 'response',
            dataIndex: 'response',
            render: (_, record) => <AdminStatusTag variant="sender" status={record.senderResponse}  confirm={confirm} transaction={record} />,
        },
        {
            title: 'RECEIVER RESPONSE',
            key: 'response',
            dataIndex: 'response',
            render: (_, record) => (
                <AdminStatusTag variant="receiver" status={record.receiverResponse} confirm={confirm} transaction={record} />
            ),
        },
        {
            title: 'STATUS',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <>
                    <div>
                        <AdminStatusTag variant="default" status={record.status} confirm={confirm} transaction={record} />
                    </div>
                    {checkRequiresInvestigation(record) ? (
                        <Chip className={classes.tags} variant="outlined" label="Requires Investigation" style={{color: 'black', background: '#FCCA46', borderColor: '#FDCD7F', borderWidth: 2, fontWeight: 'lighter'}} />
                    ) : null}
                </>
            ),
        },
    ];

    return (//if transactions are loaded, shw the table; otherwise loading indicator
        <div>
            {transactions? <Table columns={columns} dataSource={transactions} /> : <Loading />} 
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 500,
    },
    grid: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    tags: {
        marginTop: 10,
    },
}));

export default TransactionsAdminOverviewTable;
