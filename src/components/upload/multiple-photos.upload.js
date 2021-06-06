import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const MultiplePhotosUpload = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    // get base64 format of the uploaded picture
    const getBase64 = (photo) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const handlePreview = async (photo) => {
        if (!photo.url && !photo.preview) {
            photo.preview = await getBase64(photo.originFileObj);
        }
        // if photo is uploaded, show modal, set preview image and preview title
        setPreviewImage(photo.url || photo.preview);
        setPreviewVisible(true);
        setPreviewTitle(photo.name || photo.url.substring(photo.url.lastIndexOf('/') + 1));
    };

    const handleCancel = () => setPreviewVisible(false);
    const handleChange = ({ fileList }) => setFileList(fileList);

    return (
        <div>
            <Upload listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange}>
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