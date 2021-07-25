import React from 'react';
import { Tooltip } from 'antd';
import '../../theming/antd.css';
import { ListItem, ListItemText, ListItemAvatar, Avatar, makeStyles } from '@material-ui/core';
// icons import
import GetAppIcon from '@material-ui/icons/GetApp';
import PetsIcon from '@material-ui/icons/Pets';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import GenderIcon from '../../images/icons/gender.svg';
import DogIcon from '../../images/icons/cocker-spaniel.png';
import DogTagIcon from '../../images/icons/dog-tag.png';
import { VerificationIcon, CancelIcon } from 'components/icons';


function PetInformationListItem(props) {
    const classes = useStyles();
    if (props.primary) {
        const urlForOwner = "http://localhost:3000/user/".concat(props.primary)
        return (
            <ListItem
                className={classes.item}
                button={isButton(props.itemType)}
                component={isButton(props.itemType) ? 'a' : null}
                href={props.itemType === 'document' ? props.url : (props.itemType === 'owner' ? urlForOwner : null)}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <Icon itemType={props.itemType} />
                    </Avatar>
                </ListItemAvatar>
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
    const classes = useStyles();
    switch (props.itemType) {
        case 'owner':
            return <PersonRoundedIcon className={classes.icon} />;
        case 'name':
            return <img alt="name" width={25} height={25} src={DogTagIcon} className={classes.icon} />;
        case 'nickname':
            return <PersonRoundedIcon className={classes.icon} />;
        case 'age':
            return <DateRangeRoundedIcon className={classes.icon} />;
        case 'breed':
            return <img alt="breed" width={25} height={25} src={DogIcon} className={classes.icon} />;
        case 'sex':
            return <img alt="gender" width={25} height={25} src={GenderIcon} className={classes.icon} />;
        case 'document':
            return <GetAppIcon className={classes.icon} />;
        default:
            return <PetsIcon className={classes.icon} />;
    }
}

function isButton(type) {
    return type === 'owner' || type === 'document';
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        background: theme.palette.secondary.main,
    },
    icon: {
        color: theme.palette.secondary.light,
    },
    item: {
        margin: 10,
        borderRadius: 25,
        width: '100%',
        background: 'white',
        boxShadow: '0 6px 10px rgba(0,0,0,.07), 0 0 6px rgba(0,0,0,.02)',
    },
}));

export default PetInformationListItem;
