import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Image from 'material-ui-image';
import { useHistory } from 'react-router-dom';
import { getAgeString } from 'helper/helpers';
import CloseIcon from '@material-ui/icons/Close';
import { NotificationService } from 'services';
import { useDispatch } from 'react-redux';
import { deletePet, getUserPets, getPets, getPet } from 'redux/actions';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { Tooltip } from 'antd';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },
    paperLight: {
        padding: theme.spacing(4),
        paddingLeft: 50,
        paddingRight: 50,
        margin: 'auto',
        maxWidth: '90%',
        borderRadius: 25,
    },
    paperDark: {
        padding: theme.spacing(4),
        paddingLeft: 50,
        paddingRight: 50,
        margin: 'auto',
        maxWidth: '90%',
        borderRadius: 25,
        backgroundColor: '#7D7F9A',
    },
    image: {
        width: 220,
        height: 220,
        marginRight: 40,
    },
    img: {
        borderRadius: '50%',
    },
    accentText: {
        fontWeight: 500,
    },
}));

export default function PetInformationPaper(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    function goToPetProfile() {
        dispatch(getPet(props.pet._id));
        if (props.editingMode) {
            history.push('/edit/pet/' + props.pet._id);
        } else {
            history.push('/pet/' + props.pet._id);
        }
    }

    const deletePetOnClick = async () => {
        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your pet was successfully deleted!');
            dispatch(getUserPets(props.user._id));
            dispatch(getPets('', '', '', [1, 5]));
            history.push('/user');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem deleting your pet.');
        };

        dispatch(deletePet(props.pet._id, onSuccess, onError));
    };

    return (
        <div className={classes.root}>
            <Paper className={props.fromSearch ? classes.paperLight : classes.paperDark}>
                <Grid container spacing={2} justify="center" alignItems="stretch">
                    <Grid item className={classes.image} spacing={4}>
                        <Image style={props.fromSearch ? { objectFit: 'cover', } : { objectFit: 'cover', backgroundColor: '#7D7F9A', }} className={classes.img} src={props.pet.profilePicture ? props.pet.profilePicture.src : ''} />
                    </Grid>
                    <Grid item xs sm={6} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h5" style={props.fromSearch ? { color: "black" } : { color: "white" }} >
                                    {props.pet.officialName}
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography className={classes.accentText} gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            Age:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            {getAgeString(props.pet.age)}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography className={classes.accentText} gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            Sex:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            {props.pet.sex}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography className={classes.accentText} gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            Breed:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            {props.pet.breed}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs>
                                        <Typography className={classes.accentText} gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            Competition:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography gutterBottom style={props.fromSearch ? { color: "black" } : { color: "white" }}>
                                            {props.pet.competitions.length === 0 ? 'no' : 'yes'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs sm container>
                        <Grid item xs container direction="column" alignItems="flex-end" justify="space-between">
                            <Grid item>
                                {props.editingMode ? (
                                    <Button onClick={deletePetOnClick}>
                                        <CloseIcon />
                                    </Button>
                                ) : (
                                    props.pet.purchased ?
                                        <Tooltip trigger="hover" placement="top" title={"The pet is not available."}>
                                            <div>
                                                <RemoveShoppingCartIcon />
                                            </div>
                                        </Tooltip>
                                        : <Typography className={classes.accentText} gutterBottom variant="h6" style={props.fromSearch ? { color: "black", fontWeight: 600 } : { color: "white", fontWeight: 600 }}>
                                            {props.pet.price ? `${props.pet.price} €` : 'Free'}
                                        </Typography>
                                )}
                            </Grid>
                            <Grid item>
                                <Button className="resize-on-hover" variant="contained" color={props.fromSearch ? "primary" : "secondary"} onClick={goToPetProfile}>
                                    {props.editingMode ? 'Edit pet' : 'View profile'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

// attributes of props and their type
PetInformationPaper.propTypes = {
    pet: PropTypes.object,
    editingMode: PropTypes.bool,
};
