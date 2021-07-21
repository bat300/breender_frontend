import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { getPet } from '../redux/actions/petActions';
import PetProfileComponent from '../components/pet-profile/PetProfileComponent';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PremiumBanner from 'components/PremiumBanner';
import { useLoggedInUser } from 'helper/hooks/auth.hooks';

/**
 * Manages the process of getting pet details data
 * @param {props} props
 */

function PetProfileView(props) {
    const dispatch = useDispatch();
    const location = useLocation();
    const loggedInUser = useLoggedInUser();

    // get id of pet from URL
    const petId = location.pathname.split('/pet/')[1];

    useEffect(() => {
        props.dispatch(getPet(petId));
    }, [petId]);

    const selectedPet = useSelector((state) => state.pets);

    return (!selectedPet.pet && !selectedPet.error) || !selectedPet.pet._id || !selectedPet ? (
        <Loading />
    ) : selectedPet.error ? (
        <div>error</div>
    ) : selectedPet.pet ? (
        <>
            {!loggedInUser || loggedInUser.subscriptionPlan === 'free' ? <PremiumBanner /> : null}
            <PetProfileComponent
                id={petId}
                officialName={selectedPet.pet.officialName}
                nickname={selectedPet.pet.nickname}
                age={calculateAge(selectedPet.pet.birthDate)}
                sex={selectedPet.pet.sex}
                price={selectedPet.pet.price}
                profilePicture={selectedPet.pet.profilePicture}
                pictures={getAlbumWithProfilePicture(selectedPet.pet)}
                breed={selectedPet.pet.breed}
                species={selectedPet.pet.species}
                documents={selectedPet.pet.documents}
                competitions={selectedPet.pet.competitions}
                ownerId={selectedPet.pet.ownerId}
                purchased={selectedPet.pet.purchased}
            />
        </>
    ) : null;
}

function calculateAge(birthDate) {
    var ageDifMs = Date.now() - new Date(birthDate).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var result = Math.abs(ageDate.getUTCFullYear() - 1970);
    return result ? result : 0;
}

function getAlbumWithProfilePicture(selectedPet) {
    selectedPet.pictures.push(selectedPet.profilePicture);
    return selectedPet.pictures;
}

// connect() establishes allows the usage of redux functionality
export default connect()(PetProfileView);
