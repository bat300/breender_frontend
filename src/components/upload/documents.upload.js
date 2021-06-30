import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { sha256 } from 'js-sha256';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useCompetitions, useDocuments } from 'helper/hooks/pets.hooks';
import { updateCompetitions, updateDocuments } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';

/**
 *
 * @param  props
 * @returns Component to upload pet documents or certificates
 */
const DocumentsUpload = (props) => {
    const dispatch = useDispatch();

    // get global states
    const documents = useDocuments();
    const user = useUser();
    const competitions = useCompetitions();

    const [fileList, setFileList] = useState([]);
    //const [uploadedDocs, setUploadedDocs] = useState([]);

    const isCompetition = props.type === 'competitions' || false;
    const keyFolder = isCompetition ? 'competitions' : 'documents';
    const pathPrefix = `users/${user.id}/pets/documents`;
    let key = isCompetition && props.competitionId;
    let maxFileNumber = props.maxFiles || 8;

    // update file list
    const handleChange = ({ fileList }) => setFileList(fileList);

    // upload image
    const customUpload = async (data) => {
        const docName = sha256(data.file.name); //a unique name for the image

        /** Firebase storage structure
         * -| users
         *   -| userId
         *     -| pets
         *      -| documents
         */
        const imgPath = `${pathPrefix}/${docName}`;

        const newData = {
            name: data.file.name,
            type: data.file.type,
            path: imgPath,
            url: undefined,
            uploadDate: new Date(),
            verified: false,
            data: data,
        };

        if (isCompetition) {
            let competitionData = [...competitions];
            competitionData.map((item, index) => {
                if (index === key) {
                    item.certificate = newData;
                    return item;
                }
                return item;
            });
            dispatch(updateCompetitions(competitionData));
        } else {
            let docs = [...documents, newData];
            dispatch(updateDocuments(docs));
        }

        data.onSuccess(null);
    };

    // remove document
    const handleRemove = async (file) => {

        // remove competition
        if (isCompetition) {
            let competitionData = [...competitions];
            competitionData.map((item, index) => {
                if (index === key) {
                    item.certificate = {};
                    return item;
                }
                return item;
            });

            dispatch(updateCompetitions(competitionData));
            // remove document
        } else {
            let docTemp = [...documents];
            let docObj = docTemp.filter((value) => value.name !== file.name);

            dispatch(updateDocuments(docObj));
        }
    };

    return (
        <div>
            <Upload listType="text" fileList={fileList} onChange={handleChange} customRequest={customUpload} onRemove={handleRemove}>
                {fileList.length >= maxFileNumber ? null : (
                    <Button size={props.size || 'medium'} variant="contained" color="secondary" startIcon={<UploadOutlined />}>
                        Upload
                    </Button>
                )}
            </Upload>
        </div>
    );
};

export default DocumentsUpload;
