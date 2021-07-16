import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import DocumentElement from './DocumentElement';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(5),
        marginTop:  theme.spacing(5),
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 'auto',
        maxWidth: '50%',
        backgroundColor: '#F2CC8F'

    },
    button: {
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'space-between',
    },
    accentText: {
        color: 'ternary',
    },
    row: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}));

function DocumentResultsList(props) {
    const goToPetProfile = (e, id) => {
        e.preventDefault();
        props.history.push("/pet/" + id);
    }

    const classes = useStyles();

    return !props.documentsArray ? (
        <Loading />
    ) : !Array.isArray(props.documentsArray) ? (
        <div>error</div>
    ) : props.documentsArray.length > 0 ? (
        <ul style ={{listStyle:'none'}}>{props.documentsArray.map((docs) => (
            <li key={docs._id} ><Paper className={classes.paper}><Grid container justify="center"><Grid item xs={12}>
                <Typography variant="h6">
                    Pet ID: {docs._id}
                </Typography>
                <div className={classes.row + ' ' + classes.button}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ArrowForwardIcon />}
                        onClick={(e) => {goToPetProfile(e, docs._id)}}
                    >
                        Go to pet profile
                    </Button>
                    </div></Grid>
                <ul style ={{listStyle:'none'}}>{docs.documents.map((doc) => (
                    <li key={doc._id}><Grid><DocumentElement document={doc} openModalVerify={props.openModalVerify} openModalDecline={props.openModalDecline}/> </Grid></li>
                ))}</ul>
            </Grid></Paper></li>
        ))}</ul>
    ) : (
        <Grid container spacing={2} justify="center">
            <div style={{ fontSize: 30 }}>No documents to verify</div>
        </Grid>
    );
}

export default connect()(withRouter(DocumentResultsList));
