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
  if (props.primary) {
    return (
      <ListItem
        button={isButton(props.itemType)}
        component={isButton(props.itemType) ? "a" : null}
        href={props.itemType === "document" ? props.url : null}
      >
        <Icon itemType={props.itemType} avatar={props.avatar} />
        <ListItemText primary={props.primary} secondary={props.secondary} />
        {props.itemType === "document" && (
          <VerificationIcon verified={props.verified} />
        )}
      </ListItem>
    );
  }
  return null;
}

function Icon(props) {
  if (props.itemType === "owner") {
    return (
      <ListItemAvatar>
        <Avatar src={props.avatar} />
      </ListItemAvatar>
    );
  } else
    return (
      <ListItemIcon>
        {props.itemType === "document" ? <GetAppIcon /> : null}
      </ListItemIcon>
    );
}

function isButton(type) {
  return type === "owner" || type === "document";
}

export default PetInformationListItem;
