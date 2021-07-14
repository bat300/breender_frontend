import React from 'react';
// antd imports
import { Table, Tooltip } from 'antd';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PetPreviewProfileComponent from 'components/pet-profile/PetPreviewProfileComponent';
import StatusTag from 'components/StatusTag';
import { useUser } from 'helper/hooks/auth.hooks';
import PriceTag from 'components/PriceTag';
import { getTransactions, updateTransaction } from 'redux/actions';
import moment from 'moment';

const TransactionsOverviewTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { transactions } = props;

    // redux states
    const user = useUser();

    // check if user is the sender or the receiver
    const checkUserIsSender = (transaction) => {
        if (transaction.receiverId._id === user.id) {
            return false;
        } else if (transaction.senderId._id === user.id) {
            return true;
        }
    };

    const confirm = async (transaction) => {
        await dispatch(updateTransaction(transaction));
        await dispatch(getTransactions(user.id));
    };

    const checkUserStatusWasSet = (transaction) => {
        const isSender = checkUserIsSender(transaction);
        if (isSender) return transaction.senderResponse === 'success' || transaction.senderResponse === 'fail';
        else return transaction.receiverResponse === 'success' || transaction.receiverResponse === 'fail';
    };

    const getToolTipTitle = (transaction) => {
        if (transaction.status === 'pending') {
            if (transaction.senderResponse === 'pending' && transaction.receiverResponse === 'pending') {
                return 'Both receiver and sender have not responded yet.';
            } else if (transaction.senderResponse === 'pending') {
                return 'Sender have not responded yet.';
            } else if (transaction.receiverResponse === 'pending') {
                return 'Receiver have not responded yet.';
            }
        } else return null;
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <p>{text}</p>,
        },
        {
            title: 'Mate',
            dataIndex: 'pet',
            key: 'pet',
            align: 'center',
            render: (_, record) => <PetPreviewProfileComponent username={record.receiverId.username} petsName={record.pet.officialName} image={record.pet.profilePicture.src} />,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            render: (_, record) => <PriceTag isSender={checkUserIsSender(record)} price={record.amount} />,
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            render: (deadline) => <div>{String(moment(deadline).format('LLL'))}</div>,
        },
        {
            title: 'Your response',
            key: 'response',
            dataIndex: 'response',
            render: (_, record) => (
                <StatusTag
                    status={checkUserIsSender(record) ? record.senderResponse : record.receiverResponse}
                    isSelected={checkUserStatusWasSet(record)}
                    confirm={confirm}
                    transaction={record}
                    isSender={checkUserIsSender(record)}
                />
            ),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <Tooltip trigger="hover" placement="top" title={getToolTipTitle(record)}>
                    <div>
                        <StatusTag status={record.status} isSelected={true} />
                    </div>
                </Tooltip>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={transactions} />
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
}));

export default TransactionsOverviewTable;
