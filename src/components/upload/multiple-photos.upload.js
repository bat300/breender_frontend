import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { sha256 } from 'js-sha256';
import { useDispatch } from 'react-redux';
import { usePet, usePetPictures } from 'helper/hooks/pets.hooks';
import { useUser } from 'helper/hooks/auth.hooks';
import { updatePicturesToUpload } from 'redux/actions';
import { UPLOAD_STATUS } from 'helper/types';

const prepareFileList = (petPictures) => {
    let petList = [];
    petPictures.forEach((value, index) => {
        petList.push({
            uid: index,
            name: value.title,
            status: UPLOAD_STATUS.DONE,
            url: value.src,
        });
    });
    return petList;
};

const MultiplePhotosUpload = (props) => {
    const dispatch = useDispatch();
    const { mode } = props;
    const pet = usePet();
    const user = useUser();
    const petPictures = usePetPictures();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(mode === 'add' ? [] : prepareFileList(petPictures));

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
        const imageName = sha256(data.file.name); //a unique name for the image

        /** Firebase structure
         * -| users
         *   -| userId
         *     -| pets
         *      -| images
         */

        const imgPath = `users/${user.id}/pets/images/${imageName}`;

        // set status upload to upload it later to firebase
        const newData = {
            title: data.file.name,
            path: imgPath,
            src: undefined,
            description: '',
            status: UPLOAD_STATUS.UPLOAD,
            data: data,
        };

        let pics = [...petPictures, newData];

        // set global state
        dispatch(updatePicturesToUpload(pics));

        data.onSuccess(null);
    };

    // remove the image from firebase
    const handleRemove = async (file) => {
        let picTemp = [...petPictures];
        if (file.url) {
            // set status delete to remove it later onSave from firebase
            picTemp.map((value) => (value.title === file.name ? (value.status = UPLOAD_STATUS.DELETE) : value));
            dispatch(updatePicturesToUpload(picTemp));
        } else {
            let pics = picTemp.filter((value) => value.title !== file.name);
            dispatch(updatePicturesToUpload(pics));
        }
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
