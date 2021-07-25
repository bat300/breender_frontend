import React from 'react';
// antd imports
import { Table, Tag, Tooltip, Modal } from 'antd';
import '../../theming/antd.css';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PetPreviewProfileComponent from 'components/pet-profile/PetPreviewProfileComponent';
import StatusTag from 'components/tags/StatusTag';
import { useUser } from 'helper/hooks/auth.hooks';
import PriceTag from 'components/PriceTag';
import { getTransactions, updateTransaction } from 'redux/actions';
import moment from 'moment';
import { Button, Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { NotificationService } from 'services';
import { addReview } from 'redux/actions';
import AddReviewComponent from 'components/user-profile/AddReview';
import { Chip } from '@material-ui/core';

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
    const [name, setName] = React.useState(false);
    const [revieweeId, setRevieweeId] = React.useState('');

    const showModal = (record) => {
        setTransactionId(record.orderNr);
        let petOwner = getPetOwner(record)
        setName(petOwner.username);
        setRevieweeId(petOwner._id)
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const saveReview = async () => {
        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your review was successfully added!');
            setIsModalVisible(false);
            dispatch(getTransactions(user.id));
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem adding your review.');
            setIsModalVisible(false);
        };

        let reviewToUpload = {
            reviewerId: user.id,
            revieweeId: revieweeId,
            review: review,
            rating: rating,
            transactionNr: transactionId
        };

        dispatch(addReview(reviewToUpload, onSuccess, onError));
    };

    // check if user is the sender or the receiver
    const checkUserIsSender = (transaction) => {
        if (transaction.receiverId?._id === user.id) {
            return false;
        } else if (transaction.senderId?._id === user.id) {
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
        if (transaction.pet?.ownerId === transaction.senderId?._id) {
            return transaction.senderId;
        } else {
            return transaction.receiverId;
        }
    };

    // show tooltip on hovering over pending status row
    const getToolTipTitle = (transaction, type) => {
        const { status, senderResponse, receiverResponse, fee } = transaction;

        if (type === 'amount') {
            if (fee > 0 && !checkUserIsSender(transaction)) {
                return 'Because of your free plan, we charge 5% (min 1€ and max 20€) from the transaction price.';
            }
        } else {
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
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'orderNr',
            key: 'orderNr',
            render: (id) => <Typography>{String(id).toUpperCase()}</Typography>,
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
            render: (_, record) => (
                <Tooltip trigger="hover" placement="top" title={getToolTipTitle(record, 'amount')}>
                    <div>
                        <PriceTag isSender={checkUserIsSender(record)} price={record.amount} fee={record.fee} />
                    </div>
                </Tooltip>
            ),
        },
        {
            title: 'DEADLINE',
            dataIndex: 'deadline',
            key: 'deadline',
            align: 'center',
            render: (deadline) => <Typography>{String(moment(deadline).format('LLL'))}</Typography>,
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
                <Tooltip trigger="hover" placement="top" title={getToolTipTitle(record, 'status')}>
                    <div>
                        <StatusTag status={record.status} isSelected={true} />
                    </div>
                    {checkRequiresInvestigation(record) ? (
                        <Chip
                            className={classes.tags}
                            variant="outlined"
                            label="Requires Investigation"
                            style={{ color: 'black', background: '#FCCA46', borderColor: '#FDCD7F', borderWidth: 2, fontWeight: 'lighter' }}
                        />
                    ) : null}
                </Tooltip>
            ),
        },
        {
            title: 'REVIEW',
            dataIndex: 'review',
            key: 'review',
            align: 'center',
            render: (_, record) => <Button disabled={!checkUserIsSender(record) || record.isReviewed}> <AddBoxIcon onClick={function () { if (checkUserIsSender(record) && !record.isReviewed) { showModal(record); } }} /> </Button>,
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={transactions} />
            <Modal visible={isModalVisible} onOk={saveReview} onCancel={hideModal} className={classes.modal}>
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
