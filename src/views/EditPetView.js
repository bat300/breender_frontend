import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
// components import
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import Loading from 'components/Loading';
// state imports
import { usePet, usePetCompetitions, usePetDocuments, usePetPictures, usePetProfilePictureToRemove, usePetProfilePictureToUpload } from 'helper/hooks/pets.hooks';
import { changePet, getPet, updateCompetitionsToUpload, updateDocumentsToUpload, updatePicturesToUpload, updateProfilePicture } from 'redux/actions';
// helpers import
import { useUser } from 'helper/hooks/auth.hooks';
import { UPLOAD_STATUS } from 'helper/types';
import { isObjEmpty } from 'helper/helpers';
// services import
import { NotificationService, FirebaseService } from 'services';

/**
 * 
 * @param {*} props 
 * Main view to edit/modify an existing pet
 */
const EditPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const id = location.pathname.split('/edit/pet/')[1];
    const pet = usePet();
    const user = useUser();

    // get pet upload states
    const petDocuments = usePetDocuments();
    const petCompetitions = usePetCompetitions();
    const petPictures = usePetPictures();
    const petProfilePictureToUpload = usePetProfilePictureToUpload();
    const petProfilePictureToRemove = usePetProfilePictureToRemove();

    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [formIsDisabled, setFormIsDisabled] = useState(false);
    const [name, setName] = useState(pet.officialName);
    const [nickname, setNickname] = useState(pet.nickname);
    const [sex, setSex] = useState(pet.sex);
    const [birthDate, setBirthDate] = useState(new Date(pet.birthDate));
    const [species, setSpecies] = useState(pet.species);
    const [breed, setBreed] = useState(pet.breed);
    const [price, setPrice] = useState(pet.price);

    useEffect(() => {
        // update upload states
        if (loading) {
            dispatch(updateProfilePicture(pet.profilePicture, {}));
            dispatch(updatePicturesToUpload(pet.pictures));
            dispatch(updateCompetitionsToUpload(pet.competitions));
            dispatch(updateDocumentsToUpload(pet.documents));
        }

        if (pet.officialName) {
            setLoading(false);
        } else {
            const fetchPet = () => {
                dispatch(getPet(id));
                setLoading(false);
            };
            fetchPet();
        }
    }, [dispatch, id, pet.documents, pet.competitions, pet.profilePicture, pet.pictures, pet.officialName, loading]);

    const isEmpty = (str) => str === '' || str === undefined;

    useEffect(() => {
        const disabled = isEmpty(name) || isObjEmpty(petProfilePictureToUpload) || isEmpty(sex) || isEmpty(species) || isEmpty(breed);
        setFormIsDisabled(disabled);
    }, [name, sex, breed, species, petProfilePictureToUpload]);

    useEffect(() => {
        if (pet.ownerId !== user.id) {
            history.goBack();
            NotificationService.notify('error', 'Navigation Error', 'This information is restricted');
        }
    }, [pet.ownerId, user.id, history]);

    const uploadCompetitions = async () => {
        const competitionsData = [...petCompetitions];
        for (let index = 0; index < competitionsData.length; index++) {
            let value = competitionsData[index];

            if (value.certificate && Object.keys(value.certificate).length !== 0) {
                if (value.certificate.status === UPLOAD_STATUS.UPLOAD) {
                    const metadata = {
                        contentType: value.certificate.type,
                    };
                    let url = await FirebaseService.upload(value.certificate.path, value.certificate.data, metadata);
                    competitionsData[index].certificate.url = url;
                } else if (value.certificate.status === UPLOAD_STATUS.DELETE) {
                    await FirebaseService.remove(value.certificate.path);
                }
            }
        }

        let competitions = competitionsData.filter((value) => value.certificate.status !== UPLOAD_STATUS.DELETE);
        await dispatch(updateCompetitionsToUpload(competitions));

        return competitions;
    };

    const uploadDocuments = async () => {
        const documentsData = [...petDocuments];
        for (let index = 0; index < documentsData.length; index++) {
            let value = documentsData[index];

            if (value.status === UPLOAD_STATUS.UPLOAD) {
                const metadata = {
                    contentType: value.type,
                };
                let url = await FirebaseService.upload(value.path, value.data, metadata);
                documentsData[index].url = url;
            } else if (value.status === UPLOAD_STATUS.DELETE) {
                await FirebaseService.remove(value.path);
            }
        }

        let docs = documentsData.filter((value) => value.status !== UPLOAD_STATUS.DELETE);
        await dispatch(updateDocumentsToUpload(docs));

        return docs;
    };

    const uploadPictures = async () => {
        const picturesData = [...petPictures];
        for (let index = 0; index < picturesData.length; index++) {
            let value = picturesData[index];

            if (value.status === UPLOAD_STATUS.UPLOAD) {
                const metadata = {
                    contentType: 'image/png',
                };

                let url = await FirebaseService.upload(value.path, value.data, metadata);
                picturesData[index].src = url;
            } else if (value.status === UPLOAD_STATUS.DELETE) {
                await FirebaseService.remove(value.path);
            }
        }
        const pics = picturesData.filter((value) => value.status !== UPLOAD_STATUS.DELETE);
        await dispatch(updatePicturesToUpload(pics));

        return pics;
    };

    const uploadProfilePicture = async () => {
        // update profile picture only if new was uploaded
        if (Object.keys(petProfilePictureToRemove).length !== 0 && petProfilePictureToRemove?.src !== '') {
            // delete old one
            await FirebaseService.remove(petProfilePictureToRemove.path);

            // upload new one
            let value = petProfilePictureToUpload;
            const metadata = {
                contentType: 'image/png',
            };

            let url = await FirebaseService.upload(value.path, value.data, metadata);
            value.src = url;

            await dispatch(updateProfilePicture(value, {}));

            return value;
        } else {
            return pet.profilePicture;
        }
    };

    const updatePet = async () => {
        setButtonLoading(true);

        // upload documents and pics to firebase first
        const documents = await uploadDocuments();
        const competitions = await uploadCompetitions();
        const pictures = await uploadPictures();
        const profilePicture = await uploadProfilePicture();

        const dateCreated = Date.now();
        // combine all information about a pet
        let petToUpload = {
            id: id,
            ownerId: user.id,
            officialName: name,
            nickname: nickname,
            birthDate: birthDate,
            sex: sex,
            price: price,
            profilePicture: profilePicture,
            pictures: pictures,
            dateCreated: dateCreated,
            breed: breed,
            species: species,
            competitions: competitions,
            documents: documents,
        };

        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your four-legged friend was successfully updated!');
            history.push('/');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem updating your pet.');
        };

        await dispatch(changePet(petToUpload, onSuccess, onError));
        setButtonLoading(false);
    };

    // on canceling the view
    const onCancel = async () => {
        history.goBack();
    };

    return pet && !loading ? (
        <div>
            <div className={classes.layout}>
                <PetPhotosForm />
                <PetInformationForm
                    nameProp={{ name, setName }}
                    nicknameProp={{ nickname, setNickname }}
                    sexProp={{ sex, setSex }}
                    birthDateProp={{ birthDate, setBirthDate }}
                    speciesProp={{ species, setSpecies }}
                    breedProp={{ breed, setBreed }}
                    priceProp={{ price, setPrice }}
                />
            </div>
            <div className={classes.button}>
                <Button onClick={onCancel} variant="contained" color="secondary" size="large" style={{ marginRight: 20 }}>
                    Cancel
                </Button>
                <Button disabled={formIsDisabled} onClick={updatePet} type="submit" variant="contained" color="primary" size="large">
                    {buttonLoading ? <CircularProgress size={20} style={{ marginRight: 10, color: 'white' }} /> : ''} Save
                </Button>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            width: 'auto',
            alignItems: 'center',
        },
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: 20,
    },
}));

// connect() establishes the connection to the redux functionalities
export default connect()(EditPetView);
