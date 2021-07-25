import React, { useState } from 'react';
// antd imports
import 'antd/dist/antd.css';
import { Upload, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { useUser } from 'helper/hooks/auth.hooks';
import { usePet, usePetProfilePictureToRemove } from 'helper/hooks/pets.hooks';
import { updateProfilePicture } from 'redux/actions';

const AvatarUpload = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { mode } = props;
    const pet = usePet();

    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(mode === 'add' ? '' : pet.profilePicture?.src);

    const user = useUser();
    const petProfilePictureToRemove = usePetProfilePictureToRemove();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    // run this to check the type and size of the picture
    const beforeUpload = (file) => {
        // check if .jpeg or .png
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setErrorMessage('You can only upload an JPG/PNG file!');
            setOpenAlert(true);
        }

        // check if size is smaller than 2MB
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            setErrorMessage('Image must be smaller than 2MB!');
            setOpenAlert(true);
        }
        return isJpgOrPng && isLt2M;
    };

    const handleCloseAlert = () => setOpenAlert(false);

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response.
            getBase64(info.file.originFileObj, (imageUrl) => {
                setImageUrl(imageUrl);
                setLoading(false);
                setOpenAlert(false);
            });
        }
    };

    // update image url in the store
    const customUpload = async (data) => {
        const imageName = sha256(data.file.name); //a unique name for the image

        /** The structure of the firebase path
         * -| users
         *   -| userId
         *     -| pets
         *      -| images
         */

        const imgPath = `users/${user.id}/pets/images/${imageName}`;

        const newData = {
            title: data.file.name,
            description: '',
            src: undefined,
            path: imgPath,
            data: data,
        };

        // update in global state
        dispatch(updateProfilePicture(newData, petProfilePictureToRemove));

        data.onSuccess(null);
    };

    // remove the image from store, to later remove it from firebase
    const handleRemove = async (file) => {
        setImageUrl('');

        const image = pet.profilePicture;
        let imageToDelete = petProfilePictureToRemove;

        if (image && image?.src !== '' && Object.keys(petProfilePictureToRemove).length === 0) {
            imageToDelete = image;
        }

        // update in global state
        await dispatch(updateProfilePicture({}, imageToDelete));
    };

    return (
        <div>
            <div className={classes.box}>
                {imageUrl ? (
                    <Image src={imageUrl} alt="avatar" style={{ width: 250, height: 250, objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                    <div>{loading ? <LoadingOutlined /> : <PetsIcon fontSize="large" htmlColor={'#ced2de'} />}</div>
                )}
            </div>
            <div className={classes.layout}>
                {imageUrl ? (
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <IconButton onClick={handleRemove}>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </div>
                ) : (
                    <Typography color="secondary" style={{ marginTop: 10 }}>Avatar upload is required!</Typography>
                )}
                <Upload accept="image/*" name="avatar" listType="picture" showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange} customRequest={customUpload}>
                    <Button variant="outlined" color="primary" style={{ marginTop: 30 }}>
                        Choose Avatar
                    </Button>
                </Upload>
            </div>
            <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        width: 250,
        height: 250,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f1f5',
    },
    layout: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default AvatarUpload;
