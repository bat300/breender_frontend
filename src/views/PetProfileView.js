import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
// components import
import PetProfileComponent from '../components/pet-profile/PetProfileComponent';
import Loading from '../components/Loading';
// helper imports
import { isObjEmpty } from 'helper/helpers';
import { usePet } from 'helper/hooks';
import PremiumBanner from 'components/PremiumBanner';
import { useLoggedInUser } from 'helper/hooks/auth.hooks';
import { showPremiumBanner } from 'helper/helpers';
import { getPet, getUser } from 'redux/actions';

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
    const selectedPet = usePet();

    useEffect(() => {
        if (selectedPet) {
            dispatch(getUser(selectedPet.ownerId));
        } else {
            dispatch(getPet(petId));
        }
    }, [dispatch, selectedPet, petId]);

    return isObjEmpty(selectedPet) ? (
        <Loading />
    ) : selectedPet ? (
        <>
            {showPremiumBanner(loggedInUser) ? <PremiumBanner /> : null}
            <PetProfileComponent
                id={petId}
                officialName={selectedPet.officialName}
                nickname={selectedPet.nickname}
                age={selectedPet.age}
                sex={selectedPet.sex}
                price={selectedPet.price}
                profilePicture={selectedPet.profilePicture}
                pictures={selectedPet.pictures}
                breed={selectedPet.breed}
                species={selectedPet.species}
                documents={selectedPet.documents}
                competitions={selectedPet.competitions}
                ownerId={selectedPet.ownerId}
                purchased={selectedPet.purchased}
            />
        </>
    ) : null;
}

// connect() establishes allows the usage of redux functionality
export default connect()(PetProfileView);
