import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { declineDocument, getDocuments, verifyDocument } from 'redux/actions/documentActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DocumentResultsList from 'components/DocumentResultsList';

const useStyles = makeStyles((theme) => ({
    filters: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(3),
    },
    ageSlider: {
        margin: theme.spacing(4),
        width: 200,
    },
}));

const VerifyDocumentList = (props) => {
    const classes = useStyles();
    var documents = useSelector((state) => state.entities.documents);
    const [openVerify, setOpenVerify] = React.useState(false); //for modal to verify doc
    const [openDecline, setOpenDecline] = React.useState(false); //for modal to decline doc
    const [id, setId] = React.useState('');
    const [type, setType] = React.useState('');

    function handleClickOpenVerify(docId, docType) {
        setId(docId);
        setType(docType);
        setOpenVerify(true);
    }
    const handleCloseVerify = () => {
        setOpenVerify(false);
    };

    function verify() {
        props.dispatch(verifyDocument(id, type));
        loadDocuments();
        setOpenVerify(false);
    }

    function decline() {
        props.dispatch(declineDocument(id, type));
        loadDocuments();
        setOpenDecline(false);
    }

    function handleClickOpenDecline(docId, docType) {
        setId(docId);
        setType(docType);
        setOpenDecline(true);
    }
    const handleCloseDecline = () => {
        setOpenDecline(false);
    };

    const loadDocuments = async () => {
        // trigger the redux action getDocuments
        props.dispatch(getDocuments());
    };

    useEffect(() => {
        // load docs when the page is loaded or the docs were verified/declined.
        props.dispatch(getDocuments());
    }, [props]);

    return (
        <div>
            <DocumentResultsList documentsArray={documents} openModalVerify={handleClickOpenVerify} openModalDecline={handleClickOpenDecline} />
            <Dialog open={openVerify} onClose={handleCloseVerify} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title1">{'Verify document?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description1">Once the document is verified, this action cannot be reverted.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVerify} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={verify} color="secondary" autoFocus>
                        Verify
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openDecline} onClose={handleCloseDecline} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title2">{'Decline document?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description2">Once the document is declined, this action cannot be reverted.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDecline} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={decline} color="secondary" autoFocus>
                        Decline
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default connect()(withRouter(VerifyDocumentList));
