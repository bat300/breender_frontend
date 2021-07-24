import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PetsIcon from '@material-ui/icons/Pets';
import VerificationIcon from '../../components/VerificationIcon';
import CancelIcon from '@material-ui/icons/Cancel';
import { Tooltip } from 'antd';
import '../../theming/antd.css';


function PetInformationListItem(props) {

    if (props.primary) {
        const urlForOwner = "http://localhost:3000/user/".concat(props.id)
        return (
            <ListItem button={isButton(props.itemType)} component={isButton(props.itemType) ? 'a' : null} href={props.itemType === 'document' ? props.url : (props.itemType === 'owner' ? urlForOwner : null)}>
                <Icon itemType={props.itemType} avatar={props.avatar} />
                <ListItemText primary={props.primary} secondary={props.secondary} />
                {props.itemType === 'document' ?
                    props.declined ?
                        (<Tooltip trigger="hover" placement="top" title={"The document is checked and DECLINED."}>
                            <div>
                                <CancelIcon style={{ fill: 'red' }} />
                            </div>
                        </Tooltip>)
                        : (<Tooltip trigger="hover" placement="top" title={props.verified ? "The document is verified." : "The document is NOT yet verified."}>
                            <div>
                                <VerificationIcon verified={props.verified} />
                            </div>
                        </Tooltip>)
                    : null}
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
