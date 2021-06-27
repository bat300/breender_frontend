import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { sha256 } from 'js-sha256';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { usePet } from 'helper/hooks/pets.hooks';
import { useUser } from 'helper/hooks/auth.hooks';
import { updateSelectedPet } from 'redux/actions';


const prepareDocumentsFileList = (pet) => {
    let petList = [];
    pet.documents.forEach((value, index) => {
        petList.push({
            uid: index,
            name: value.name,
            status: 'done',
            url: value.url,
        });
    });
    return petList;
};

const prepareCompetitionsFileList = (pet) => {
    let petList = [];
    pet.competitions.forEach((value, index) => {
        if(value.certificate) {
            petList.push({
                uid: index,
                name: value.certificate.name,
                status: 'done',
                url: value.certificate.url,
            });
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

    // get global states
    const user = useUser();
    const pet = usePet();
    
    const isCompetition = props.type === 'competitions' || false;

    const [fileList, setFileList] = useState(pet ? isCompetition ? prepareCompetitionsFileList(pet) : prepareDocumentsFileList(pet) : []);

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
            status: 'upload',
        };

        let petData = pet;

        if (isCompetition) {
            let competitionData = [...pet.competitions];
            competitionData.map((item, index) => {
                if (index === key) {
                    item.certificate = newData;
                    return item;
                }
                return item;
            });
            petData.competitions = competitionData
            dispatch(updateSelectedPet(petData));
        } else {
            let docs = [...pet.documents, newData];
            petData.documents = docs
            dispatch(updateSelectedPet(petData));
        }

        data.onSuccess(null);
    };

    // remove document
    const handleRemove = async (file) => {
        let petData = pet;
        // remove competition
        if (isCompetition) {
            let competitionData = [...pet.competitions];
            competitionData.map((item, index) => {
                if (index === key) {
                    item.certificate = {};
                    return item;
                }
                return item;
            });

            petData.competitions = competitionData
            dispatch(updateSelectedPet(petData));
            // remove document
        } else {
            let petData = pet;
            let docData = [...pet.documents];

            if (file.url) {
                // set status delete to remove it later onSave from firebase
                docData.map((value) => (value.name === file.name ? (value.status = 'delete') : value));
                petData.documents = docData;
                dispatch(updateSelectedPet(petData));
            } else {
                let docObj = docData.filter((value) => value.name !== file.name);
                petData.documents = docObj
                dispatch(updateSelectedPet(petData));
            }
        }
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
