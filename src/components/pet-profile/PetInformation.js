import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PetInformationListItem from './PetInformationListItem';
import { Grid, List } from '@material-ui/core';
import { getAgeString } from 'helper/helpers';

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
            <List>
                <PetInformationListItem primary={props.officialName} secondary={'Name'} itemType="name" />
                <PetInformationListItem primary={props.nickname} secondary={'Nickname'} itemType="nickname" />
                <PetInformationListItem primary={props.ownerId} secondary={'Owner'} itemType="owner" />
                <PetInformationListItem primary={getAgeString(props.age)} secondary={'Age'} itemType="age" />
                <PetInformationListItem primary={props.sex} secondary={'Sex'} itemType="sex" />
                <PetInformationListItem primary={props.breed} secondary={'Breed'} itemType="breed" /> 
            </List>
        </div>
    );
}

export default PetInformation;
