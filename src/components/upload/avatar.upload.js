import React, { useState } from 'react';
// antd imports
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PetsIcon from '@material-ui/icons/Pets';

const AvatarUpload = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

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

    return (
        <div>
            <div className={classes.box}>
                {imageUrl ? 
                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                    : 
                    <div>
                        {loading ? <LoadingOutlined /> : <PetsIcon fontSize="large" htmlColor={'#ced2de'} />}
                    </div>
                }
            </div>
            <Upload name="avatar" listType="text" showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange}>
                <Button variant="contained" color="primary" style={{ margin: 30 }}>
                    Choose Photo
                </Button>
            </Upload>
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
}));

export default AvatarUpload;
