import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Lightbox from 'react-lightbox-component';
import './album.css';
import CircleProfileImage from '../../components/CircleProfileImage';

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        flex: 1,
        margin: 10,
    },
}));

function PetPhotos(props) {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <Grid container alignItems="center" justify="center" direction="column">
                <CircleProfileImage imageUrl={props.profilePicture?.src} />
                {props.pictures?.length === 0 ||
                props.pictures.some(function (el) {
                    return el === null;
                }) ? null : (
                    <Lightbox
                        images={props.pictures}
                        showImageModifiers={false}
                        renderDescriptionFunc={(image) => {
                            return <div />;
                        }}
                    />
                )}
            </Grid>
        </div>
    );
}

export default PetPhotos;
