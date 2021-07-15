import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { Tag } from 'antd';

const STATUS_TYPE = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAIL: 'fail',
};

const StatusTag = (props) => {
    const { isSelected, status, confirm, transaction, isSender } = props;
    const [response, setResponse] = useState(status);
    const [open, setOpen] = useState(false);

    const color = () => {
        switch (status) {
            case STATUS_TYPE.PENDING:
                return 'orange';
            case STATUS_TYPE.SUCCESS:
                return 'green';
            case STATUS_TYPE.FAIL:
                return 'red';
            default:
                return 'orange';
        }
    };

    const handleResponseChange = (event) => {
        const response = event.target.value;
        if (response !== STATUS_TYPE.PENDING) {
            setOpen(true);
        }
        setResponse(response);
    };

    const handleClose = () => {
        setOpen(false);
        setResponse(STATUS_TYPE.PENDING);
    };

    const handleConfirm = () => {
        let transactionCopy = transaction;
        if (isSender) {
            transactionCopy.senderResponse = response;
        } else {
            transactionCopy.receiverResponse = response;
        }
        confirm(transactionCopy);
        setOpen(false);
    };

    return (
        <>
            {isSelected ? (
                <Tag color={color()} key={status}>
                    {status.toUpperCase()}
                </Tag>
            ) : (
                <FormControl required variant="outlined" size="small" fullWidth>
                    <InputLabel id="response-label">Response</InputLabel>
                    <Select label="Response" id="response" value={response} onChange={handleResponseChange} onBlur={handleResponseChange}>
                        <MenuItem value={STATUS_TYPE.PENDING}>{STATUS_TYPE.PENDING}</MenuItem>
                        <MenuItem value={STATUS_TYPE.SUCCESS}>{STATUS_TYPE.SUCCESS}</MenuItem>
                        <MenuItem value={STATUS_TYPE.FAIL}>{STATUS_TYPE.FAIL}</MenuItem>
                    </Select>
                </FormControl>
            )}
            <Dialog open={open} onClose={handleClose} onBlur={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Confirm Action'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Please confirm you want to officially change the status.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const useStyles = makeStyles((theme) => ({}));

export default StatusTag;
