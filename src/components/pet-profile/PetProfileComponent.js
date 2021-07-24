import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Divider, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
// components import
import PetPhotos from './PetPhotos';
import PetInformation from './PetInformation';
import PetCompetitionsList from './PetCompetitionsList';
import PetDocumentsList from './PetDocumentsList';
import { PaymentButton, ContactButton } from '../Button';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// state imports
import { getPet } from 'redux/actions';
import { useUser } from 'helper/hooks';

/**
 * Manages the process of getting pet details data
 * @param props
 */

function PetProfileComponent(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedInUser = useUser();
    const id = props.id;
    const myPet = loggedInUser.id === props.ownerId;

    const fetchPet = async () => {
        await dispatch(getPet(id));
        history.push(`/edit/pet/${id}`);
    };

    return (
        <div className={classes.layout}>
            <Grid container>
                <Grid item className={classes.maxWidth} spacing={2}>
                    <Paper className={classes.paper} style={{ padding: 50, paddingTop: 24 }}>
                        <Grid container alignItems="center" justify="space-between" className={classes.gridMargin}>
                            <Grid item container xs justify="center" alignItems="center">
                                <Typography variant="h4" className={classes.label}>
                                    {props.officialName}
                                </Typography>
                            </Grid>
                            <Grid item container xs={7} justify="flex-end">
                                {myPet ? (
                                    <div className={classes.buttonGrid}>
                                        <Button variant="contained" color="primary" startIcon={<EditOutlinedIcon />} onClick={fetchPet}>
                                            Edit
                                        </Button>
                                    </div>
                                ) : (
                                    <ContactButton breederId={props.ownerId} petId={id} />
                                )}
                            </Grid>
                        </Grid>
                        <Divider variant="middle" />
                        <Grid container xs alignItems="center" justify="center" className={classes.centerGridMargin}>
                            <Grid item container xs justify="center" className={classes.leftLayout} style={{ padding: 20 }}>
                                <PetPhotos pictures={props.pictures} profilePicture={props.profilePicture} />
                                <PaymentButton pet={props} />
                            </Grid>
                            <Grid item container xs={7} alignItems="center" justify="center" style={{ paddingLeft: 80 }}>
                                <PetInformation
                                    officialName={props.officialName}
                                    nickname={props.nickname}
                                    age={props.age}
                                    sex={props.sex}
                                    price={props.price}
                                    breed={props.breed}
                                    species={props.species}
                                    ownerId={props.ownerId}
                                />
                            </Grid>
                        </Grid>
                        {props.documents.length === 0 && props.competitions.length === 0 ? null : <Divider variant="middle" />}
                        <Grid container justify="space-between" className={classes.gridMargin}>
                            <PetOptionalInformation ownerId={props.ownerId} documents={props.documents} competitions={props.competitions} />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

function LeftTypography(props) {
    const classes = useStyles();

    return (
        <div className={classes.leftTypography}>
            <Typography variant="h5">{props.text}</Typography>
        </div>
    );
}

function PetOptionalInformation(props) {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" justify="center" direction="column" className={classes.gridMargin}>
            {props.competitions.length !== 0 && <Competitions competitions={props.competitions} />}
            {props.documents.length !== 0 && <Documents documents={props.documents} />}
        </Grid>
    );
}

function Competitions(props) {
    const classes = useStyles();
    return (
        <Grid item className={classes.maxWidth}>
            <LeftTypography text="Competitions:" />
            <PetCompetitionsList competitions={props.competitions} ownerId={props.ownerId} />
            <Divider variant="middle" style={{ marginTop: 30 }} />
        </Grid>
    );
}

function Documents(props) {
    const classes = useStyles();
    return (
        <Grid item className={classes.maxWidth}>
            <LeftTypography text="Documents:" />
            <PetDocumentsList documents={props.documents} ownerId={props.ownerId} />
            <Divider variant="middle" style={{ marginTop: 30 }} />
        </Grid>
    );
}

export default withRouter(PetProfileComponent);

const useStyles = makeStyles((theme) => ({
    layout: {
        width: '80%',
        alignSelf: 'center',
    },
    maxWidth: {
        marginTop: 20,
        width: '100%',
    },
    paper: {
        background: '#FEFEFE',
        borderRadius: 25,
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    label: {
        padding: 10,
    },
    leftTypography: {
        width: '100%',
        alignItems: 'start',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(4),
    },
    gridMargin: {
        marginTop: 10,
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    centerGridMargin: {
        marginTop: 20,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    buttonGrid: {
        marginTop: 20,
        marginBottom: 20,
        paddingRight: 15,
    },
    leftLayout: {
        borderRadius: 25,
        width: '100%',
        background: 'white',
        boxShadow: '0 6px 10px rgba(0,0,0,.07), 0 0 6px rgba(0,0,0,.02)',
    },
}));
