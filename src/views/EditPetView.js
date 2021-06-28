import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import { Button, CircularProgress } from '@material-ui/core';
import { usePet, useProfilePicture } from 'helper/hooks/pets.hooks';
import { changePet, clearPetInfos, getPet, updateProfilePicture, updateSelectedPet } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import Loading from 'components/Loading';
import { NotificationService, FirebaseService } from 'services';
import { useHistory } from 'react-router-dom';

const EditPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const id = props.match.params.id;
    const pet = usePet();
    const user = useUser();

    const [loading, setLoading] = useState(true);
    const [formIsDisabled, setFormIsDisabled] = useState(false);
    const [name, setName] = useState(pet.officialName);
    const [nickname, setNickname] = useState(pet.nickname);
    const [sex, setSex] = useState(pet.sex);
    const [birthDate, setBirthDate] = useState(new Date(pet.birthDate));
    const [species, setSpecies] = useState(pet.species);
    const [breed, setBreed] = useState(pet.breed);
    const [price, setPrice] = useState(pet.price);

    useEffect(() => {
        const isEmpty = (str) => str === '' || str === undefined;
        const disabled = isEmpty(name) || isEmpty(pet?.profilePicture?.path) || isEmpty(sex) || isEmpty(species) || isEmpty(breed);
        setFormIsDisabled(disabled);
    }, [name, sex, breed, species, pet?.profilePicture?.path]);

    useEffect(() => {
        if(pet.officialName) {
            setLoading(false);
        } else {
            const fetchPet = async () => {
                await dispatch(getPet(id));
                await setLoading(false);
            };
            fetchPet();
        }

    }, [dispatch, id, pet.officialName]);

    window.onbeforeunload = (event) => {
        dispatch(clearPetInfos());
        dispatch(updateProfilePicture({}));
    };

    // get old profile picture to delete it later if it was updated
    const oldProfilePicture = useProfilePicture();

    const uploadCompetitions = async () => {
        const competitionsData = [...pet.competitions];
        for (let index = 0; index < competitionsData.length; index++) {
            let value = competitionsData[index];

            if (value.certificate) {
                if (value.certificate.status === 'upload') {
                    const metadata = {
                        contentType: value.certificate.type,
                    };
                    let url = await FirebaseService.upload(value.certificate.path, value.certificate.data, metadata);
                    competitionsData[index].certificate.url = url;
                } else if (value.certificate.status === 'delete') {
                    await FirebaseService.remove(value.certificate.path);
                }
            }
        }

        let petData = pet;
        petData.competitions = competitionsData.filter((value) => value.certificate.status !== 'delete');
        await dispatch(updateSelectedPet(petData));
    };

    const uploadDocuments = async () => {
        const documentsData = [...pet.documents];
        for (let index = 0; index < documentsData.length; index++) {
            let value = documentsData[index];

            if (value.status === 'upload') {
                const metadata = {
                    contentType: value.type,
                };
                let url = await FirebaseService.upload(value.path, value.data, metadata);
                documentsData[index].url = url;
            } else if (value.status === 'delete') {
                await FirebaseService.remove(value.path);
            }
        }

        let petData = pet;
        petData.documents = documentsData.filter((value) => value.status !== 'delete');
        await dispatch(updateSelectedPet(petData));
    };

    const uploadPictures = async () => {
        const picturesData = [...pet.pictures];
        for (let index = 0; index < picturesData.length; index++) {
            let value = picturesData[index];

            if (value.status === 'upload') {
                const metadata = {
                    contentType: 'image/png',
                };

                let url = await FirebaseService.upload(value.path, value.data, metadata);
                picturesData[index].src = url;
            } else if (value.status === 'delete') {
                await FirebaseService.remove(value.path);
            }
        }
        let petData = pet;
        petData.pictures = picturesData.filter((value) => value.status !== 'delete');
        await dispatch(updateSelectedPet(petData));
    };

    const uploadProfilePicture = async () => {
        // update profile picture only if new was uploaded
        if (oldProfilePicture) {
            // delete old one
            await FirebaseService.remove(oldProfilePicture.path);

            // upload new one
            let value = pet.profilePicture;
            const metadata = {
                contentType: 'image/png',
            };

            let url = await FirebaseService.upload(value.path, value.data, metadata);
            value.src = url;

            let petData = pet;
            petData.profilePicture = value;

            await dispatch(updateSelectedPet(petData));
        }
    };

    const updatePet = async () => {
        setLoading(true);

        // upload documents and pics to firebase first
        await uploadDocuments();
        await uploadCompetitions();
        await uploadPictures();
        await uploadProfilePicture();

        // combine all information about a pet
        let petToUpload = {
            id: id,
            ownerId: user.id,
            officialName: name,
            nickname: nickname,
            birthDate: birthDate,
            sex: sex,
            price: price,
            profilePicture: pet.profilePicture,
            pictures: pet.pictures,
            breed: breed,
            species: species,
            competitions: pet.competitions,
            documents: pet.documents,
        };

        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your four-legged friend was successfully updated!');
            history.push('/');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem updating your pet.');
        };

        dispatch(changePet(petToUpload, onSuccess, onError));
        setLoading(false);
    };

    // on canceling the view
    const onCancel = async () => {
        await dispatch(clearPetInfos());
        await dispatch(updateProfilePicture({}));
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
                    {loading ? <CircularProgress size={20} color="white" style={{ marginRight: 10 }} /> : ''} Save
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
