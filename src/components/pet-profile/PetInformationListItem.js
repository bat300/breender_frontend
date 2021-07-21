import React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PetsIcon from '@material-ui/icons/Pets';
import VerificationIcon from '../../components/VerificationIcon';
import CancelIcon from '@material-ui/icons/Cancel';

function PetInformationListItem(props) {
    if (props.primary) {
        const urlForOwner = "http://localhost:3000/user/".concat(props.primary)
        return (
            <ListItem button={isButton(props.itemType)} component={isButton(props.itemType) ? 'a' : null} href={props.itemType === 'document' ? props.url : (props.itemType === 'owner' ? urlForOwner : null)}>
                <Icon itemType={props.itemType} avatar={props.avatar} />
                <ListItemText primary={props.primary} secondary={props.secondary} />
                {props.itemType === 'document' ? props.declined? <CancelIcon style={{fill: 'red'}}/> : <VerificationIcon verified={props.verified}/> : null}
            </ListItem>
        );
    }
    return null;
}

function Icon(props) {
    switch (props.itemType) {
        case 'owner':
            return (
                <ListItemAvatar>
                    <Avatar src={props.avatar} />
                </ListItemAvatar>
            );
        case 'document':
            return (
                <ListItemIcon>
                    <GetAppIcon />
                </ListItemIcon>
            );
        default:
            return (
                <ListItemAvatar>
                    <Avatar>
                        <PetsIcon />
                    </Avatar>
                </ListItemAvatar>
            );
    }
}

function isButton(type) {
    return type === 'owner' || type === 'document';
}

export default PetInformationListItem;
