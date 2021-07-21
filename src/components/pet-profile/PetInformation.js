import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PetInformationListItem from './PetInformationListItem';
import { Grid, List } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flex: 1,
        maxWidth: '100%',
    },
    helf: {
        width: '50%',
    },
}));

function PetInformation(props) {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <Grid container direction="row" align="center" justify="center" alignItems="center">
                <Grid item xs={6}>
                    <List>
                        <PetInformationListItem primary={props.officialName} secondary={'Name'} />
                        <PetInformationListItem primary={props.nickname} secondary={'Nickname'} />
                        <PetInformationListItem id={props.owner?._id} primary={props.owner?.username} secondary={'Owner'} itemType={'owner'} avatar={props.avatar ? props.avatar : null} />
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List>
                        <PetInformationListItem primary={props.breed} secondary={'Breed'} />
                        <PetInformationListItem primary={props.age + ' years old'} secondary={'Age'} />
                        <PetInformationListItem primary={props.sex} secondary={'Sex'} />
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}

export default PetInformation;
