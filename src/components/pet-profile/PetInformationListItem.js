import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import VerificationIcon from "../../components/VerificationIcon";

function PetInformationListItem(props) {
  if (props.itemType == "owner" || props.itemType == "document") {
    return (
      <ListItem button>
        <Icon itemType={props.itemType} avatar={props.avatar} />
        <ListItemText primary={props.primary} secondary={props.secondary} />
        {props.itemType == "document" && (
          <VerificationIcon verified={props.verified} />
        )}
      </ListItem>
    );
  } else
    return (
      <ListItem>
        <Icon itemType={props.itemType} />
        <ListItemText primary={props.primary} secondary={props.secondary} />
      </ListItem>
    );
}

function Icon(props) {
  if (props.itemType == "owner") {
    return (
      <ListItemAvatar>
        <Avatar src={props.avatar} />
      </ListItemAvatar>
    );
  } else
    return (
      <ListItemIcon>
        {props.itemType == "document" ? <GetAppIcon /> : null}
      </ListItemIcon>
    );
}

export default PetInformationListItem;
