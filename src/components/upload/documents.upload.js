import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { sha256 } from 'js-sha256';
import { Button } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { usePetCompetitions, usePetDocuments } from 'helper/hooks/pets.hooks';
import { useUser } from 'helper/hooks/auth.hooks';
import { updateCompetitionsToUpload, updateDocumentsToUpload } from 'redux/actions';
import { UPLOAD_STATUS } from 'helper/types';

const prepareCompetitions = (competitions) => {
    let arr = competitions;
    arr.map((value, index) => {
        value.key = index;
        value.date = new Date(value.date);
        return value;
    });
    return arr;
};


const prepareDocumentsFileList = (petDocuments) => {
    let petList = [];
    petDocuments?.forEach((value, index) => {
        petList.push({
            uid: index,
            name: value.name,
            status: UPLOAD_STATUS.DONE,
            url: value.url,
        });
    });
    return petList;
};

const prepareCompetitionsFileList = (petCompetitions, key) => {
    const competitions = prepareCompetitions(petCompetitions);
    let petList = [];
    competitions.forEach((value, index) => {
        if (value.key === key) {
            if (value.certificate) {
                petList.push({
                    uid: index,
                    name: value.certificate.name,
                    status: UPLOAD_STATUS.DONE,
                    url: value.certificate.url,
                });
            }
        }
    });
    return petList;
};

/**
 *
 * @param  props
 * @returns Component to upload pet documents or certificates
 */

const DocumentsUpload = (props) => {
    const dispatch = useDispatch();
    const { mode } = props;
    const isCompetition = props.type === 'competitions';
    let key = isCompetition ? props.competitionId : null;

    // get global states
    const user = useUser();
    const petDocuments = usePetDocuments();
    const petCompetitions = usePetCompetitions();

    const [fileList, setFileList] = useState(mode === 'add' ? [] : isCompetition ? prepareCompetitionsFileList(petCompetitions, key) : prepareDocumentsFileList(petDocuments));

    const pathPrefix = `users/${user.id}/pets/documents`;
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
            status: UPLOAD_STATUS.UPLOAD,
        };

        if (isCompetition) {
            let competitionData = [...petCompetitions];
            competitionData.map((item, index) => {
                if (item.key === key) {
                    item.certificate = newData;
                    return item;
                }
                return item;
            });
            dispatch(updateCompetitionsToUpload(competitionData));
        } else {
            let docs = [...petDocuments, newData];
            dispatch(updateDocumentsToUpload(docs));
        }

        data.onSuccess(null);
    };

    // remove document
    const handleRemove = async (file) => {
        // remove competition
        if (isCompetition) {
            let competitionData = [...petCompetitions];
            competitionData.map((item, index) => {
                if (item._id === key) {
                    item.certificate = undefined;
                    return item;
                }
                return item;
            });

            dispatch(updateCompetitionsToUpload(competitionData));
            // remove document
        } else {
            let docData = [...petDocuments];

            if (file.url) {
                // set status delete to remove it later onSave from firebase
                docData.map((value) => (value.name === file.name ? (value.status = UPLOAD_STATUS.DELETE) : value));
                dispatch(updateDocumentsToUpload(docData));
            } else {
                let docObj = docData.filter((value) => value.name !== file.name);
                dispatch(updateDocumentsToUpload(docObj));
            }
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

export default connect()(DocumentsUpload);
