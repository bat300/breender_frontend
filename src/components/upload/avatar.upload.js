import React, { useState } from 'react';
// antd imports
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { storage } from './../../firebase';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { updateProfilePicture } from 'redux/actions';
import { FormHelperText } from '@material-ui/core';

const AvatarUpload = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fullPath, setFullPath] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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
        const metadata = {
            contentType: data.type,
        };
        const storageRef = await storage.ref();
        const imageName = sha256(data.file.name); //a unique name for the image

        /** @TODO change to the structure
         * -| users
         *   -| userId
         *     -| pets
         *      -| pictures
         */

        const imgPath = `images/${imageName}.png`;
        // define storage path in the firebase
        const imgFile = storageRef.child(imgPath);
        try {
            // upload image
            let uploadTask = imgFile.put(data.file, metadata);

            uploadTask.then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                    console.log('File available at', url);
                    setFullPath(imgPath);

                    // update in global state
                    dispatch(updateProfilePicture(url));
                });
            });

            data.onSuccess(null, uploadTask);
        } catch (e) {
            data.onError(e);
        }
    };

    // remove the image from firebase
    const handleRemove = async (file) => {
        const storageRef = await storage.ref();
        storageRef
            .child(fullPath)
            .delete()
            .then(() => {
                setFullPath('');
                setImageUrl('');

                // update in global state
                dispatch(updateProfilePicture(''));
                console.log('Deletion was successful');
            })
            .catch((error) => {
                console.log('Error while deletion has occurred', error);
            });
    };

    return (
        <div>
            <div className={classes.box}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <div>{loading ? <LoadingOutlined /> : <PetsIcon fontSize="large" htmlColor={'#ced2de'} />}</div>}
            </div>
            <div className={classes.layout}>
                {imageUrl ? (
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <IconButton onClick={handleRemove}>
                            <DeleteOutlinedIcon color="error" />
                        </IconButton>
                    </div>
                ) : <div style={{ justifyContent: 'center', display: 'flex' }}>
                     <FormHelperText>Avatar upload is required!</FormHelperText>
                    </div>
                    }
                <Upload accept="image/*" name="avatar" listType="picture" showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange} customRequest={customUpload}>
                    <Button variant="contained" color="primary" style={{ margin: 30 }}>
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
