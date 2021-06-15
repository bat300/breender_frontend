import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { storage } from './../../firebase';
import { sha256 } from 'js-sha256';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useDocuments } from 'helper/hooks/pets.hooks';
import { updateDocuments } from 'redux/actions';

const DocumentsUpload = (props) => {
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState([]);
    const [uploadedDocs, setUploadedDocs] = useState([]);

    let maxFileNumber = props.maxFiles || 8;
    const documents = useDocuments();

    // update file list
    const handleChange = ({ fileList }) => setFileList(fileList);

    // upload image to the firebase
    const customUpload = async (data) => {
        const metadata = {
            contentType: data.type,
        };
        const storageRef = await storage.ref();
        const docName = sha256(data.file.name); //a unique name for the image

        /** @TODO change to the structure
         * -| users
         *   -| userId
         *     -| pets
         *      -| documents
         */

        const imgPath = `documents/${docName}`;
        // define storage path in the firebase
        const imgFile = storageRef.child(imgPath);
        try {
            // upload image
            let uploadTask = imgFile.put(data.file, metadata);

            uploadTask.then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setUploadedDocs([...uploadedDocs, { name: data.file.name, fullPath: imgPath, downloadUrl: downloadURL }]);

                    let docs = [...documents, { name: docName, type: data.file.type, url: downloadURL, uploadDate: new Date(), verified: false }]
                    dispatch(updateDocuments(docs));
                });
            });

            data.onSuccess(null, uploadTask);
        } catch (e) {
            data.onError(e);
        }
    };

    // remove the image from firebase
    const handleRemove = async (file) => {
        let obj = uploadedDocs.find((value) => value.name === file.name);
        let obj2 = documents.find((value) => String(obj.fullPath) === `documents/${value.name}`);

        const storageRef = await storage.ref();
        storageRef
            .child(obj.fullPath)
            .delete()
            .then(() => {
                const index = uploadedDocs.indexOf(obj);
                let temp = uploadedDocs.splice(index, 1);
                setUploadedDocs(temp);

                const index2 = documents.indexOf(obj2);
                let temp2 = documents.splice(index2, 1);

                dispatch(updateDocuments(temp2));

                console.log('Deletion was successful');

            })
            .catch((error) => {
                console.log('Error while deletion has occurred', error);
            });
    };

    return (
        <div>
            <Upload listType="text" fileList={fileList} onChange={handleChange} customRequest={customUpload} onRemove={handleRemove}>
                {fileList.length >= maxFileNumber ? null : (
                    <Button size={props.size || 'medium'} variant="contained" color="primary" startIcon={<UploadOutlined />}>
                        Upload
                    </Button>
                )}
            </Upload>
        </div>
    );
};

export default DocumentsUpload;
