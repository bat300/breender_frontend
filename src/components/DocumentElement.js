import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        minWidth: "500px",
        backgroundColor: '#7D7F9A',
        boxShadow: '0 6px 10px rgba(0,0,0,.07), 0 0 6px rgba(0,0,0,.02)'
    },
    image: {
        width: 256,
        height: 256,
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
    },
    label: theme.typography.h6
}));

function DocumentElement(props) {
    const classes = useStyles();
    const [processed, setProcessed] = React.useState(false);

    useEffect(() => {
        var document = props.document.certificate ? props.document.certificate : props.document;
        setProcessed(document.verified || document.declined);
    }, [props]);

    function verify() {
        props.document.certificate ? props.openModalVerify(props.document.certificate._id, 'comp', props.ownerId, props.officialName ) : props.openModalVerify(props.document._id, 'doc', props.ownerId, props.officialName );
    }
    function decline() {
        props.document.certificate ? props.openModalDecline(props.document.certificate._id, 'comp', props.ownerId, props.officialName ) : props.openModalDecline(props.document._id, 'doc', props.ownerId, props.officialName );
    }

    function formatDate(stringToFormat) {
        const date = new Date(stringToFormat);
        return date.toLocaleDateString('en-GB')
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <AssignmentIcon style={{fill: "white"}}/>
                    </Grid>
                    <Grid item xs={12} sm container>
                        {props.document.certificate ? (
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" gutterBottom className={classes.label} style={{fontWeight: "500", color: "white"}}>
                                                Name:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{ color: "white"}}>
                                                {props.document.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" className={classes.label} style={{fontWeight: "500", color: "white"}}>
                                                Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{color: "white"}}>
                                                {formatDate(props.document.date)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" className={classes.label} style={{fontWeight: "500", color: "white"}}>
                                                Category:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{ color: "white"}}>
                                                {props.document.category === '' ? '-' : props.document.category}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" className={classes.label} style={{fontWeight: "500", color: "white"}}>
                                                Prize:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{color: "white"}}>
                                                {props.document.prize === '' ? '-' : props.document.prize}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                   {props.document.certificate.verificationDate? <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" className={classes.label} style={{fontWeight: "500", color: "white"}}>
                                                Verification Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{color: "white"}}>
                                                {formatDate(props.document.certificate.verificationDate)}
                                            </Typography>
                                        </Grid>
                                    </Grid> : <></>} 
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{ color: "white"}}>
                                                {props.document.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    {props.document.verificationDate? <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" className={classes.label} style={{fontWeight: "500", color: "white"}}>
                                                Verification Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" className={classes.label} style={{ color: "white"}}>
                                                {formatDate(props.document.verificationDate)}
                                            </Typography>
                                        </Grid>
                                    </Grid> : <></>}
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <div className={classes.row + ' ' + classes.button}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<GetAppIcon />}
                        component="a"
                        href={props.document.certificate ? props.document.certificate.url : props.document.url}
                    >
                        Document
                    </Button>
                    {processed ? null : ( //if document is already processed, do not show buttons
                        <>
                            <Button variant="contained" color="secondary" className={classes.button} startIcon={<CheckIcon />} component="a" onClick={verify}>
                                Verify
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button} startIcon={<ClearIcon />} component="a" onClick={decline}>
                                Decline
                            </Button>
                        </>
                    )}
                </div>
            </Paper>
        </div>
    );
}

// attributes of props and their type

export default connect()(withRouter(DocumentElement));
