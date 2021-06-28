import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import { Button, CircularProgress } from '@material-ui/core';
import { usePet } from 'helper/hooks/pets.hooks';
import { addPet, clearPetInfos, updateProfilePicture, updateSelectedPet } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import { useHistory } from 'react-router-dom';
import FirebaseService from 'services/FirebaseService';
import NotificationService from 'services/NotificationService';
import Loading from 'components/Loading';

const AddPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const pet = usePet();
    const user = useUser();

    const [loading, setLoading] = useState(true);
    const [formIsDisabled, setFormIsDisabled] = useState(false);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const isEmpty = (str) => str === '' || str === undefined;
        const disabled = isEmpty(name) || isEmpty(pet?.profilePicture?.path) || isEmpty(sex) || isEmpty(species) || isEmpty(breed);
        setFormIsDisabled(disabled);
    }, [name, sex, breed, species, pet?.profilePicture?.path]);

    useEffect(() => {
        let loading = true;

        const clear = async () => {
            if (!loading) return;
            setLoading(false);
        };

        clear();

        return () => {
            loading = false;
        };
    }, [dispatch]);

    window.onbeforeunload = (event) => {
        dispatch(clearPetInfos());
        dispatch(updateProfilePicture({}));
    };

    const uploadCompetitions = async () => {
        const competitionsData = [...pet?.competitions];
        for (let index = 0; index < competitionsData.length; index++) {
            let value = competitionsData[index];
            if (value.certificate) {
                const metadata = {
                    contentType: value.certificate.type,
                };
                let url = await FirebaseService.upload(value.certificate.path, value.certificate.data, metadata);
                competitionsData[index].certificate.url = url;
            }
        }

        let petData = pet;
        petData.competitions = competitionsData;

        await dispatch(updateSelectedPet(petData));
    };

    const uploadDocuments = async () => {
        const documentsData = [...pet?.documents];
        for (let index = 0; index < documentsData.length; index++) {
            let value = documentsData[index];
            const metadata = {
                contentType: value.type,
            };
            let url = await FirebaseService.upload(value.path, value.data, metadata);
            documentsData[index].url = url;
        }

        let petData = pet;
        petData.documents = documentsData;

        await dispatch(updateSelectedPet(petData));
    };

    const uploadPictures = async () => {
        const picturesData = [...pet.pictures];
        for (let index = 0; index < picturesData.length; index++) {
            let value = picturesData[index];
            const metadata = {
                contentType: 'image/png',
            };

            let url = await FirebaseService.upload(value.path, value.data, metadata);
            picturesData[index].src = url;
        }
        let petData = pet;
        petData.pictures = picturesData;
        await dispatch(updateSelectedPet(petData));
    };

    const uploadProfilePicture = async () => {
        let value = pet.profilePicture;
        const metadata = {
            contentType: 'image/png',
        };

        let url = await FirebaseService.upload(value.path, value.data, metadata);
        value.src = url;

        let petData = pet;
        petData.profilePicture = value;

        await dispatch(updateSelectedPet(petData));
    };

    const createPet = async () => {
        setLoading(true);

        // upload documents and pics to firebase first
        await uploadDocuments();
        await uploadCompetitions();
        await uploadPictures();
        await uploadProfilePicture();

        // combine all information about a pet
        let petToUpload = {
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
            NotificationService.notify('success', 'Success', 'Your four-legged friend was added to your profile!');
            history.push('/');
            dispatch(clearPetInfos());
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem uploading your pet.');
        };

        dispatch(addPet(petToUpload, onSuccess, onError));
        setLoading(false);
    };

    return loading ? (
        <Loading />
    ) : (
        <div>
            <div className={classes.layout}>
                <PetPhotosForm mode="add"/>
                <PetInformationForm
                    mode="add"
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
                <Button disabled={formIsDisabled} onClick={createPet} type="submit" variant="contained" color="primary" size="large">
                    {loading ? <CircularProgress size={20} color="white" style={{ marginRight: 10 }} /> : ''} Save
                </Button>
            </div>
        </div>
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
        marginRight: 50,
    },
}));

// connect() establishes the connection to the redux functionalities
export default connect()(AddPetView);
