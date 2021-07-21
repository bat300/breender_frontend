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
import PaymentButton from '../../components/PaymentButton';
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
                <Grid item className={classes.maxWidth}>
                    <Paper className={classes.paper}>
                        <Grid container alignItems="stretch" align="center" justify="center" direction="row" className={classes.gridMargin} spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="h4" align="center">
                                    {props.officialName}
                                </Typography>
                                <PetPhotos pictures={props.pictures} profilePicture={props.profilePicture} />
                                <PaymentButton price={props.price === null? 0 : props.price} />
                            </Grid>
                            <Divider variant="middle" />
                            <Grid xs={7} direction="column">
                                {myPet ? (
                                    <Grid item xs={12} className={classes.buttonGrid}>
                                        <Button variant="contained" color="secondary" startIcon={<EditOutlinedIcon />} onClick={fetchPet}>
                                            Edit
                                        </Button>
                                    </Grid>
                                ) : null}

                                <Grid item xs={12}>
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
                        </Grid>
                        {props.documents.length === 0 && props.competitions.length === 0 ? null : <Divider variant="middle" />}
                        <PetOptionalInformation ownerId={props.ownerId} documents={props.documents} competitions={props.competitions} />
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
            <Typography variant="h6">{props.text}</Typography>
        </div>
    );
}

function PetOptionalInformation(props) {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" justify="center" direction="column" className={classes.gridMargin} spacing={2}>
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
            <Divider variant="middle" />
        </Grid>
    );
}

function Documents(props) {
    const classes = useStyles();
    return (
        <Grid item className={classes.maxWidth}>
            <LeftTypography text="Documents:" />
            <PetDocumentsList documents={props.documents} ownerId={props.ownerId} />
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
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    cards: {
        margin: theme.spacing(2),
    },
    leftTypography: {
        width: '100%',
        alignItems: 'start',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(4),
    },
    gridMargin: {
        marginTop: theme.spacing(2),
    },
    buttonGrid: {
        marginBottom: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
}));
