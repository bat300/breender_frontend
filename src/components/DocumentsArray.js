import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { declineDocument, verifyDocument } from 'redux/actions/documentActions';
import Loading from './Loading';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DocumentResultsList from 'components/DocumentResultsList';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    description: theme.typography.body1,
    modal: {
        bordeRadius: "10px"
    }
}));

const DocumentsArray = (props) => {
    const classes = useStyles();
    const documents = useSelector((state) => state.documents);
    const [openVerify, setOpenVerify] = React.useState(false); //for modal to verify doc
    const [openDecline, setOpenDecline] = React.useState(false); //for modal to decline doc
    const [id, setId] = React.useState('');
    const [type, setType] = React.useState('');
    const [ownerId, setOwnerId] = React.useState('');
    const [officialName, setOfficialName] = React.useState('');

    function handleClickOpenVerify(docId, docType, ownerId, officialName) {
        setId(docId);
        setType(docType);
        setOwnerId(ownerId);
        setOfficialName(officialName);

        setOpenVerify(true);
    }
    const handleCloseVerify = () => {
        setOpenVerify(false);
    };

    async function verify() {
        await props.dispatch(verifyDocument(id, type, ownerId, officialName));
        props.setLoading(true);
        setOpenVerify(false);
    }

    async function decline() {
       await props.dispatch(declineDocument(id, type,  ownerId, officialName));
        props.setLoading(true);
        setOpenDecline(false);
    }

    function handleClickOpenDecline(docId, docType, ownerId, officialName) { 
        setId(docId);
        setType(docType);
        setOwnerId(ownerId);
        setOfficialName(officialName);
        setOpenDecline(true);
    }
    const handleCloseDecline = () => {
        setOpenDecline(false);
    };

    useEffect(() => { 
        if (props.loading) { //if reload is required and the tab is active, retrieve updated docs 
           if (props.active) {
                props.dispatch(props.getDocuments());
                props.setLoading(false)
            }
        }
        // load docs when the page is loaded or the docs were verified/declined.
    }, [props]);

    return !documents ? (
        <Loading />
    ) : (
        <div>
            <DocumentResultsList documentsArray={documents.documents} openModalVerify={handleClickOpenVerify} openModalDecline={handleClickOpenDecline} className={classes.modal} />
            <Dialog open={openVerify} onClose={handleCloseVerify} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description1">
                <DialogTitle id="alert-dialog-title1">{'Verify document?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.description}>Once the document is verified, this action cannot be reverted.</DialogContentText>
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
            <Dialog open={openDecline} onClose={handleCloseDecline} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description2" className={classes.modal}>
                <DialogTitle id="alert-dialog-title2">{'Decline document?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.description}>Once the document is declined, this action cannot be reverted.</DialogContentText>
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

export default connect()(withRouter(DocumentsArray));
