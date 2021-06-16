import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getPet } from "../redux/actions/petActions";
import PetProfileComponent from "../components/pet-profile/PetProfileComponent";
import Loading from "../components/Loading";

/**
 * Manages the process of getting pet details data
 * @param {props} props
 */

const useStyles = makeStyles((theme) => ({}));

function PetProfileView(props) {
  let { match, getPet } = props;

  // from redux store
  const selectedPet = useSelector((state) => state.selectedPet);

  useEffect(() => {
    // get id of pet from URL
    let petId = match.params.id;
    getPet(petId);
  }, [match.params]);

  return !selectedPet.pet && !selectedPet.error ? (
    <Loading />
  ) : selectedPet.error ? (
    <div>error</div>
  ) : selectedPet.pet ? (
    <PetProfileComponent
      officialName={selectedPet.officialName}
      nickname={selectedPet.nickname}
      birthDate={calculateAge(selectedPet.birthDate)}
      sex={selectedPet.sex}
      price={selectedPet.price}
      profilePicture={selectedPet.profilePicture}
      pictures={selectedPet.pictures}
      breed={selectedPet.breed}
      species={selectedPet.species}
      documents={selectedPet.documents}
      competitions={selectedPet.competitions}
      ownerId={selectedPet.ownerId}
    />
  ) : null;
}

function calculateAge(birthDate) {
  var ageDifMs = Date.now() - birthDate.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// connect() establishes allows the usage of redux functionality
export default connect(null, { getPet })(PetProfileView);
