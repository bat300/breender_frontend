import React, { useEffect, useState } from 'react';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const STATUS_TYPE = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAIL: 'fail',
};

const VARIANT_TYPE = {
    SENDER: 'sender',
    RECEIVER: 'receiver',
    DEFAULT: 'default',
};

const AdminStatusTag = (props) => {
    const classes = useStyles();
    const { status, variant, confirm, transaction } = props;

    const [tagStatus, setTagStatus] = useState(status);
    const [statusToChange, setStatusToChange] = useState(status);
    const [tagClicked, setTagClicked] = useState(false);
    const [open, setOpen] = useState(false);

    const color = () => {
        switch (status) {
            case STATUS_TYPE.PENDING:
                return { color: 'orange', background: 'white', borderColor: '#FDCD7F' };
            case STATUS_TYPE.SUCCESS:
                return { color: 'green', background: 'white', borderColor: '#A1CF6B' };
            case STATUS_TYPE.FAIL:
                return { color: 'red', background: 'white', borderColor: '#E87461' };
            default:
                return { color: 'orange', background: 'white', borderColor: 'orange' };
        }
    };

    useEffect(() => {
        setTagStatus(status);
        setStatusToChange(status);
    }, [status]);

    const handleStatusChange = (event) => {
        const status = event.target.value;
        setStatusToChange(status);
    };

    const handleClose = () => {
        setOpen(false);
        setStatusToChange(tagStatus);
        setTagClicked(false);
    };

    const handleConfirm = () => {
        let transactionCopy = transaction;
        switch (variant) {
            case VARIANT_TYPE.SENDER:
                transactionCopy.senderResponse = statusToChange;
                break;
            case VARIANT_TYPE.RECEIVER:
                transactionCopy.receiverResponse = statusToChange;
                break;
            case VARIANT_TYPE.DEFAULT:
                transactionCopy.status = statusToChange;
                break;
            default:
                transactionCopy.status = statusToChange;
                break;
        }

        confirm(transactionCopy);

        setTagStatus(statusToChange);
        setTagClicked(false);
    };

    const openTag = () => setTagClicked(true);

    return (
        <>
            {!tagClicked ? (
                <Chip variant="outlined" key={tagStatus} label={tagStatus.toUpperCase()} style={{ ...color(), borderWidth: 2, fontWeight: 'lighter' }} onClick={openTag} />
            ) : (
                <div className={classes.layout}>
                    <FormControl required variant="outlined" size="small" fullWidth>
                        <InputLabel id="response-label">Response</InputLabel>
                        <Select label="Response" id="response" value={statusToChange} onChange={handleStatusChange}>
                            <MenuItem value={STATUS_TYPE.PENDING}>{STATUS_TYPE.PENDING}</MenuItem>
                            <MenuItem value={STATUS_TYPE.SUCCESS}>{STATUS_TYPE.SUCCESS}</MenuItem>
                            <MenuItem value={STATUS_TYPE.FAIL}>{STATUS_TYPE.FAIL}</MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.buttons}>
                        <IconButton size="small" onClick={handleConfirm}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton size="small" onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </div>
            )}
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="primary">{'Confirm Action'}</DialogTitle>
                <DialogContent>
                    <DialogContentText color="primary" id="alert-dialog-description">Please confirm you want to officially change the status.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        justifyContent: 'center',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 10,
    },
}));

export default AdminStatusTag;
