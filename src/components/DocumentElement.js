import React from 'react';
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
    rowFontStyle: {
        fontSize: 18,
        fontWeight: 600,
    },
    valueFontStyle: {
        fontSize: 18,
    },

    largeIcon: {
        width: 60,
        height: 60,
    },
}));

 function DocumentElement(props) {
    const classes = useStyles();

    function verify() {
        props.document.certificate? props.openModalVerify(props.document.certificate._id, "comp") : props.openModalVerify(props.document._id, "doc");
    }
    function decline() {
        props.document.certificate? props.openModalDecline(props.document.certificate._id, "comp") : props.openModalDecline(props.document._id, "doc"); 
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <AssignmentIcon />
                    </Grid>
                    <Grid item xs={12} sm container>
                        {props.document.certificate?<Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" gutterBottom className={classes.rowFontStyle}>
                                            Name:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" className={classes.valueFontStyle}>
                                            {props.document.name}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" className={classes.rowFontStyle}>
                                            Date:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" className={classes.valueFontStyle}>
                                            {props.document.date.substring(0, 10)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" className={classes.rowFontStyle}>
                                            Category:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" className={classes.valueFontStyle}>
                                            {props.document.category === '' ? '-' : props.document.category}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography variant="body2" className={classes.rowFontStyle}>
                                            Prize:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" className={classes.valueFontStyle}>
                                            {props.document.prize === '' ? '-' : props.document.prize}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> : props.document.name}
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
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<CheckIcon />}
                        component="a"
                        onClick={verify}
                    >
                        Verify
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ClearIcon />}
                        component="a"
                        onClick={decline}
                    >
                        Decline
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

// attributes of props and their type


export default connect()(withRouter(DocumentElement));