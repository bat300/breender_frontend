import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PetInformationListItem from './PetInformationListItem';
import { getAgeString } from 'helper/helpers';
import { Row, Col } from 'antd';
import { useSelectedUser } from 'helper/hooks';

const useStyles = makeStyles((theme) => ({
    layout: {
        marginRight: 50,
    },
}));

function PetInformation(props) {
    const classes = useStyles();
    const petOwner = useSelectedUser();

    return (
        <Row align="middle" gutter={{ xs: 24, sm: 12 }} className={classes.layout}>
            <Col flex={1} offset={1}>
                <PetInformationListItem primary={props.officialName} secondary={'Name'} itemType="name" />
                <PetInformationListItem primary={props.nickname} secondary={'Nickname'} itemType="nickname" />
                <PetInformationListItem primary={petOwner.username} secondary={'Owner'} itemType="owner" />
            </Col>
            <Col flex={1} offset={1}>
                <PetInformationListItem primary={getAgeString(props.age)} secondary={'Age'} itemType="age" />
                <PetInformationListItem primary={props.sex} secondary={'Sex'} itemType="sex" />
                <PetInformationListItem primary={props.breed} secondary={'Breed'} itemType="breed" />
            </Col>
        </Row>
    );
}

export default PetInformation;
