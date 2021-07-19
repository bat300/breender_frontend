import React, { useState } from 'react';
// antd imports
import 'antd/dist/antd.css';
import { Upload, Image } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Snackbar, FormHelperText } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { updateProfilePicture, updateSelectedPet } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import { usePet } from 'helper/hooks/pets.hooks';

const AvatarUpload = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { mode } = props;
    const pet = usePet();

    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [imageUrl, setImageUrl] = useState(mode === 'add' ? '' : pet.profilePicture.src);
 
    const user = useUser();

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

        let petData = pet;
        petData.profilePicture = newData;

        // update in global state
        dispatch(updateSelectedPet(petData));

        data.onSuccess(null);
    };

    // remove the image from firebase
    const handleRemove = async (file) => {
        setImageUrl('');

        const image = pet.profilePicture;

        if(image.src !== '') {
            await dispatch(updateProfilePicture(image));
        }

        let petData = pet;
        petData.profilePicture = {};
    
        // update in global state
        await dispatch(updateSelectedPet(petData));
    };

    return (
        <div>
            <div className={classes.box}>
                {imageUrl ? <Image src={imageUrl} alt="avatar" style={{ width: 200, height: 200, objectFit: 'cover' }} /> : <div>{loading ? <LoadingOutlined /> : <PetsIcon fontSize="large" htmlColor={'#ced2de'} />}</div>}
            </div>
            <div className={classes.layout}>
                {imageUrl ? (
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <IconButton onClick={handleRemove}>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </div>
                ) : (
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <FormHelperText>Avatar upload is required!</FormHelperText>
                    </div>
                )}
                <Upload accept="image/*" name="avatar" listType="picture" showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange} customRequest={customUpload}>
                    <Button variant="contained" color="secondary" style={{ margin: 30 }}>
                        Choose Photo
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
        width: 200,
        height: 200,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f1f5',
    },
    layout: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'column',
    },
}));

export default AvatarUpload;
