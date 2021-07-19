import React from 'react';
// antd imports
import { Table, Tag, Tooltip, Modal } from 'antd';
import '../../theming/antd.css';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PetPreviewProfileComponent from 'components/pet-profile/PetPreviewProfileComponent';
import StatusTag from 'components/StatusTag';
import { useUser } from 'helper/hooks/auth.hooks';
import PriceTag from 'components/PriceTag';
import { getTransactions, updateTransaction } from 'redux/actions';
import moment from 'moment';
import { Button } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { NotificationService } from 'services';
import { addReview } from 'redux/actions';
import AddReviewComponent from 'components/user-profile/AddReview';

const TransactionsOverviewTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { transactions } = props;

    // states
    const user = useUser();
    const checkRequiresInvestigation = (t) => (t.senderResponse === 'fail' && t.receiverResponse === 'success') || (t.senderResponse === 'success' && t.receiverResponse === 'fail');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState('');
    const [transactionId, setTransactionId] = React.useState('');
    const [processedTransaction, setProcessedTransaction] = React.useState(false);
    const [name, setName] = React.useState(false);
    const [revieweeId, setRevieweeId] = React.useState('');

    const showModal = (record) => {
        console.log(record);
        setTransactionId(record.orderNr);
        let petOwner = getPetOwner(record)
        setName(petOwner.username);
        setRevieweeId(petOwner._id)
        setProcessedTransaction(record.processed);
        setIsModalVisible(true);
    };

    const hideModal = () => {
        saveReview();
        setIsModalVisible(false);
    };

    const saveReview = async () => {
        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your review was successfully added!');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem adding your review.');
        };
        console.log("Rating is", rating)
        console.log("Date is ", new Date().toLocaleDateString('de-DE'))

        let reviewToUpload = {
            reviewerId: user.id,
            revieweeId: revieweeId,
            review: review,
            rating: rating,
            processedTransaction: processedTransaction,
            transactionNr: transactionId
        };

        dispatch(addReview(reviewToUpload, onSuccess, onError));
    };

    // check if user is the sender or the receiver
    const checkUserIsSender = (transaction) => {
        if (transaction.receiverId._id === user.id) {
            return false;
        } else if (transaction.senderId._id === user.id) {
            return true;
        }
    };

    // update transaction on confirming to change the transaction status
    const confirm = async (transaction) => {
        await dispatch(updateTransaction(transaction));
        await dispatch(getTransactions(user.id));
    };

    const checkUserStatusWasSet = (transaction) => {
        const isSender = checkUserIsSender(transaction);
        const { senderResponse, receiverResponse, status } = transaction;
        const statusWasSet = status === 'fail' || status === 'success';
        if (isSender) return senderResponse === 'success' || senderResponse === 'fail' || statusWasSet;
        else return receiverResponse === 'success' || receiverResponse === 'fail' || statusWasSet;
    };

    // get the owner of the pet
    const getPetOwner = (transaction) => {
        if (transaction.pet.ownerId === transaction.senderId._id) {
            return transaction.senderId;
        } else {
            return transaction.receiverId;
        }
    };

    // show tooltip on hovering over pending status row
    const getToolTipTitle = (transaction) => {
        const { status, senderResponse, receiverResponse } = transaction;
        if (status === 'pending') {
            if (senderResponse === 'pending' && receiverResponse === 'pending') {
                return 'Both receiver and sender have not responded yet.';
            } else if (senderResponse === 'pending') {
                return 'Sender have not responded yet.';
            } else if (receiverResponse === 'pending') {
                return 'Receiver have not responded yet.';
            }
        } else if (status === 'fail' && ((senderResponse === 'fail' && receiverResponse === 'success') || (senderResponse === 'success' && receiverResponse === 'fail'))) {
            return 'Transaction requires further investigation. Our employee will contact you soon.';
        } else return null;
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
            render: (_, record) => <PriceTag isSender={checkUserIsSender(record)} price={record.amount} />,
        },
        {
            title: 'DEADLINE',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            render: (deadline) => <div>{String(moment(deadline).format('LLL'))}</div>,
        },
        {
            title: 'YOUR RESPONSE',
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
            title: 'STATUS',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <Tooltip trigger="hover" placement="top" title={getToolTipTitle(record)}>
                    <div>
                        <StatusTag status={record.status} isSelected={true} />
                    </div>
                    {checkRequiresInvestigation(record) ? (
                        <Tag className={classes.tags} color="gold">
                            Requires Investigation
                        </Tag>
                    ) : null}
                </Tooltip>
            ),
        },
        {
            title: 'REVIEW',
            dataIndex: 'review',
            key: 'review',
            align: 'center',
            render: (_, record) => <Button> <AddBoxIcon onClick={function () { showModal(record); }} /> </Button>,
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={transactions} />
            <Modal visible={isModalVisible} onOk={hideModal} onCancel={hideModal} className={classes.modal}>
                <AddReviewComponent ratingProp={{ rating, setRating }} reviewProp={{ review, setReview }} name={name} />
            </Modal>
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
    modal: {
        width: '80vw',
        margin: '0 auto',
        marginTop: 100,
    },
}));

export default TransactionsOverviewTable;
