import React from 'react';
import { Grid } from '@material-ui/core';
import Lightbox from 'react-lightbox-component';
import './album.css';
import CircleProfileImage from '../../components/CircleProfileImage';

function PetPhotos(props) {
    return (
            <Grid item container alignItems="center" justify="center" direction="column">
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
    );
}

export default PetPhotos;
