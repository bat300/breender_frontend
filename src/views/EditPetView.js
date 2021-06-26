import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { PetInformationForm, PetPhotosForm } from 'components/forms';
import { Button } from '@material-ui/core';
import { useCompetitions, useDocuments, usePet, usePictures, useProfilePicture } from 'helper/hooks/pets.hooks';
import { addPet, getPet } from 'redux/actions';
import { useUser } from 'helper/hooks/auth.hooks';
import Loading from 'components/Loading';

const EditPetView = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const id = props.match.params.id;
    let pet = usePet();

    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        if (loading) {
            fetchPet().then(() => {
                props.forceUpdate();
                console.log(pet);
                setName(pet.officialName);
                //setLoading(false);
            });
        }
    }, [loading]);

    const fetchPet = async () => {
        try {
            dispatch(getPet(id));
        } catch (err) {
            // notify error occurred
        }
    };

    // check if all required fields are filled
    const formIsValid = () => {
        return name && sex && species && breed;
    };

    const createPet = () => {
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
            //PetService.createPet(pet);
            dispatch(addPet(pet));
        } catch (err) {
            throw new Error(err);
        }
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
                <Button disabled={!formIsValid()} onClick={createPet} type="submit" variant="contained" color="primary" size="large">
                    Save
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
        marginRight: 50,
    },
}));

// connect() establishes the connection to the redux functionalities
export default connect()(EditPetView);
