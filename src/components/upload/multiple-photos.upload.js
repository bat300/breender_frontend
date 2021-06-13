import React, { useState } from 'react';
import firebase from 'firebase';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { storage } from './../../firebase';
import { sha256 } from 'js-sha256';

const MultiplePhotosUpload = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [uploadedImages, setUploadedImages] = useState(new Array());

    // get base64 format of the uploaded picture
    const getBase64 = (photo) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleCancel = () => setPreviewVisible(false);

    // update file list
    const handleChange = ({ fileList }) => setFileList(fileList);

    const handlePreview = async (photo) => {
        if (!photo.url && !photo.preview) {
            photo.preview = await getBase64(photo.originFileObj);
        }
        // if photo is uploaded, show modal, set preview image and preview title
        setPreviewImage(photo.url || photo.preview);
        setPreviewVisible(true);
        setPreviewTitle(photo.name || photo.url.substring(photo.url.lastIndexOf('/') + 1));
    };

    // upload image to the firebase
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

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUploadedImages([...uploadedImages, { name: data.file.name, fullPath: imgPath, downloadUrl: downloadURL }]);
                });
            });

            data.onSuccess(null, uploadTask);
        } catch (e) {
            data.onError(e);
        }
    };

    // remove the image from firebase
    const handleRemove = async (file) => {
        let obj = uploadedImages.find((value) => value.name === file.name);

        const storageRef = await storage.ref();
        storageRef
            .child(obj.fullPath)
            .delete()
            .then(() => {
                const index = uploadedImages.indexOf(obj);
                uploadedImages.splice(index, 1);
                console.log('Deletion was successful');
            })
            .catch((error) => {
                console.log('Error while deletion has occurred', error);
            });
    };

    return (
        <div>
            <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange} customRequest={customUpload} onRemove={handleRemove}>
                {fileList.length >= 8 ? null : (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                )}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default MultiplePhotosUpload;
