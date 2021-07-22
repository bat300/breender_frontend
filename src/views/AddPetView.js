import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress } from '@material-ui/core';
// components imports
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import Loading from 'components/Loading';
import { useLoggedInUser } from 'helper/hooks/auth.hooks';

// store-relevant imports
import { usePetCompetitions, usePetDocuments, usePetPictures, usePetProfilePictureToUpload, useUser } from 'helper/hooks/';
import { addPet, clearPet, updateCompetitionsToUpload, updateDocumentsToUpload, updatePicturesToUpload, updateProfilePicture } from 'redux/actions';
// services import
import { FirebaseService, NotificationService } from 'services';
import { isObjEmpty } from 'helper/helpers';

/**
 * 
 * @param {*} props 
 * Main view for adding a new pet
 */
const AddPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    // get user
    const user = useUser();
    const loggedInUser = useLoggedInUser();

    // get pet upload states
    const petDocuments = usePetDocuments();
    const petCompetitions = usePetCompetitions();
    const petPictures = usePetPictures();
    const petProfilePictureToUpload = usePetProfilePictureToUpload();

    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [formIsDisabled, setFormIsDisabled] = useState(false);
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const isEmpty = (obj) => obj === '' || obj === undefined;
        const disabled = isEmpty(name) || isObjEmpty(petProfilePictureToUpload) || isEmpty(sex) || isEmpty(species) || isEmpty(breed);
        setFormIsDisabled(disabled);
    }, [name, sex, breed, species, petProfilePictureToUpload]);

    useEffect(() => {
        let loading = true;

        const clear = async () => {
            if (!loading) return;
            dispatch(clearPet());
            setLoading(false);
        };

        clear();

        return () => {
            loading = false;
        };
    }, [dispatch]);

    const uploadCompetitions = async () => {
        const competitionsData = [...petCompetitions];
        for (let index = 0; index < competitionsData.length; index++) {
            let value = competitionsData[index];
            if (value.certificate !== null || value.certificate !== undefined) {
                const metadata = {
                    contentType: value.certificate.type,
                };
                let url = await FirebaseService.upload(value.certificate.path, value.certificate.data, metadata);
                competitionsData[index].certificate.url = url;
            }
        }

        await dispatch(updateCompetitionsToUpload(competitionsData));

        return competitionsData;
    };

    const uploadDocuments = async () => {
        const documentsData = [...petDocuments];
        for (let index = 0; index < documentsData.length; index++) {
            let value = documentsData[index];
            const metadata = {
                contentType: value.type,
            };
            let url = await FirebaseService.upload(value.path, value.data, metadata);
            documentsData[index].url = url;
        }

        await dispatch(updateDocumentsToUpload(documentsData));

        return documentsData;
    };

    const uploadPictures = async () => {
        const picturesData = [...petPictures];
        for (let index = 0; index < picturesData.length; index++) {
            let value = picturesData[index];
            const metadata = {
                contentType: 'image/png',
            };

            let url = await FirebaseService.upload(value.path, value.data, metadata);
            picturesData[index].src = url;
        }

        await dispatch(updatePicturesToUpload(picturesData));

        return picturesData;
    };

    const uploadProfilePicture = async () => {
        let value = petProfilePictureToUpload;
        const metadata = {
            contentType: 'image/png',
        };

        let url = await FirebaseService.upload(value.path, value.data, metadata);
        value.src = url;

        await dispatch(updateProfilePicture(value, {}));
        return value;
    };

    const createPet = async () => {
        setButtonLoading(true);

        // upload documents and pics to firebase first
        const documents = await uploadDocuments();
        const competitions = await uploadCompetitions();
        const pictures = await uploadPictures();
        const profilePicture = await uploadProfilePicture();

        const dateCreated = Date.now();
        // combine all information about a pet
        let petToUpload = {
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
            NotificationService.notify('success', 'Success', 'Your four-legged friend was added to your profile!');
            history.push('/');
            dispatch(clearPet());
        };

        const onError = () => {
            NotificationService.notify('error', 'Error', 'There was a problem uploading your pet.');
        };

        await dispatch(addPet(petToUpload, onSuccess, onError));
        setButtonLoading(false);
    };

    return loading ? (
        <Loading />
    ) : (
        <div>
            <div className={classes.layout}>
                <PetPhotosForm mode="add" />
                <PetInformationForm
                    mode="add"
                    nameProp={{ name, setName }}
                    nicknameProp={{ nickname, setNickname }}
                    sexProp={{ sex, setSex }}
                    birthDateProp={{ birthDate, setBirthDate }}
                    speciesProp={{ species, setSpecies }}
                    breedProp={{ breed, setBreed }}
                    priceProp={{ price, setPrice }}
                    disabledProp={{ formIsDisabled, setFormIsDisabled }}
                    user={loggedInUser}
                />
            </div>
            <div className={classes.button}>
                <Button disabled={formIsDisabled} onClick={createPet} type="submit" variant="contained" color="secondary" size="large">
                    {buttonLoading ? <CircularProgress size={20} style={{ marginRight: 10, color: 'white' }} /> : ''} Save
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
