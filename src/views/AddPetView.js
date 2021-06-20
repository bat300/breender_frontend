import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import { Button } from '@material-ui/core';
import { useCompetitions, useDocuments, usePictures, useProfilePicture } from 'helper/hooks/pets.hooks';
import { addPet } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';

const AddPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

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

    // check if all required fields are filled
    const formIsValid = () => {
        return name && profilePicture && sex && species && breed;
    };

    const createPet = async () => {
        // combine all information about a pet
        let pet = {
            ownerId: user.id,
            officialName: name,
            nickname: nickname,
            birthDate: birthDate,
            sex: sex,
            price: price,
            profilePicture: profilePicture,
            pictures: pictures,
            breed: breed,
            species: species,
            competitions: competitions,
            documents: documents,
        };

        try {
            await dispatch(addPet(pet));

            notification['success']({
                message: 'Success',
                description: 'Your four-legged friend was added to your profile!',
                placement: 'bottomRight',
            });
            // redirect to the home page
            history.push('/');
        } catch (err) {
            notification['error']({
                message: 'Error',
                description: 'There was a problem uploading your pet.',
                placement: 'bottomRight',
            });
        }
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
                <Button disabled={!formIsValid()} onClick={createPet} type="submit" variant="contained" color="primary" size="large">
                    Save
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
