import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import { Button, CircularProgress } from '@material-ui/core';
import { useCompetitions, useDocuments, usePictures, useProfilePicture } from 'helper/hooks/pets.hooks';
import { addPet, updateCompetitions, updateDocuments, updatePictures, updateProfilePicture } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import { useHistory } from 'react-router-dom';
import FirebaseService from 'services/FirebaseService';
import NotificationService from 'services/NotificationService';

const AddPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [price, setPrice] = useState(0);

    const profilePicture = useProfilePicture();
    const pictures = usePictures();
    const documents = useDocuments();
    const competitions = useCompetitions();
    const user = useUser();

    const isEmpty = (str) => str === '';

    // check if all required fields are filled
    const formIsDisabled = isEmpty(name) && isEmpty(profilePicture) && isEmpty(sex) && isEmpty(species) && isEmpty(breed);

    const uploadCompetitions = async () => {
        const competitionsData = [...competitions];
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

        await dispatch(updateCompetitions(competitionsData));
    };

    const uploadDocuments = async () => {
        const documentsData = [...documents];
        for (let index = 0; index < documentsData.length; index++) {
            let value = documentsData[index];
            const metadata = {
                contentType: value.type,
            };
            let url = await FirebaseService.upload(value.path, value.data, metadata);
            documentsData[index].url = url;
        }

        await dispatch(updateDocuments(documentsData));
    };

    const uploadPictures = async () => {
        const picturesData = [...pictures];
        for (let index = 0; index < picturesData.length; index++) {
            let value = picturesData[index];
            const metadata = {
                contentType: 'image/png',
            };

            let url = await FirebaseService.upload(value.path, value.data, metadata);
            picturesData[index].src = url;
        }

        await dispatch(updatePictures(picturesData));
    };

    const uploadProfilePicture = async () => {
        let value = profilePicture;
        const metadata = {
            contentType: 'image/png',
        };

        let url = await FirebaseService.upload(value.path, value.data, metadata);
        value.src = url;

        await dispatch(updateProfilePicture(value));
    };

    const createPet = async () => {
        setLoading(true);

        // upload documents and pics to firebase first
        await uploadDocuments();
        await uploadCompetitions();
        await uploadPictures();
        await uploadProfilePicture();
        
        const dateCreated = Date.now();
        // combine all information about a pet
        let pet = {
            ownerId: user.id,
            officialName: name,
            nickname: nickname,
            birthDate: birthDate,
            sex: sex,
            price: price,
            dateCreated: dateCreated,
            profilePicture: profilePicture,
            pictures: pictures,
            breed: breed,
            species: species,
            competitions: competitions,
            documents: documents,
        };

        const onSuccess = () => {
            NotificationService.notify('success', 'Success', 'Your four-legged friend was added to your profile!');
            history.push('/');
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem uploading your pet.');
        };

        dispatch(addPet(pet, onSuccess, onError));
        setLoading(false);
    };

    return (
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
