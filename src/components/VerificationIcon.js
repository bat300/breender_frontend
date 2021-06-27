import React from "react";
import Icon from "@material-ui/core/Icon";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

function VerificationIcon(props) {
  return (
    <Icon>{props.verified ? <VerifiedUserIcon /> : <NewReleasesIcon />}</Icon>
  );
}

export default VerificationIcon;
