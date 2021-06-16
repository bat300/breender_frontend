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
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // get id of pet from URL
    let petId = match.params.id;
    getPet(petId);
  }, [match.params]);

  const pictureArray = [
    {
      src: "https://image.jochen-schweizer.de/jSslMtTvuc1nIEKe9n9NC9c-j5k=/570x375/http%3A%2F%2Fmain.static.jsmd-group.com%2Fassets%2F_default_upload_bucket%2Fhusky-ausfahrt-12133-4.jpg",
      title: "image title",
      description: "image description",
    },
    {
      src: "https://www.yourdogmagazin.at/wp-content/uploads/2019/09/bannerhusky.jpg",
      title: "image title",
      description: "image description",
    },
    {
      src: "https://www.jagderleben.de/sites/default/files/styles/hero_teaser_index_2_1_xs_1x/public/2020-12/husky-wiese-47034475.jpg?itok=BCjUt8yD",
      title: "image title",
      description: "image description",
    },
  ];
  // TODO: This is only mock data, real data should be retreived from backend
  const petData = {
    officialName: "Fluffy",
    nickname: "Stick Destroyer 9000",
    birthDate: new Date(2015, 11, 17),
    sex: "Male",
    price: 55.25,
    profilePicture:
      "https://yt3.ggpht.com/ytc/AAUvwngRxgqP5YK6r7OKCrGQ_hGsf1YKQklU8OOMYv20Vw=s900-c-k-c0x00ffffff-no-rj",
    pictures: pictureArray,
    breed: "Siberian Husky",
    species: "dog",
    competitions: [
      {
        name: "Best Doggo of 2020",
        date: new Date(2020, 10, 22),
        category: "Big Doggo",
        prize: "1st Place",
        certificate: {
          name: "best_doggo.pdf",
          type: "Best Doggo of 2020 Prize Certificate",
          uploadDate: new Date(2020, 11, 14),
          verified: true,
          verificationDate: new Date(2020, 11, 18),
        },
      },
      {
        name: "Handsomest Boyo of 2018",
        date: new Date(2018, 3, 8),
        category: "Husky Doggo",
        prize: "3rd Place",
        certificate: {},
      },
    ],
    documents: [
      {
        name: "birth_cert.pdf",
        type: "Birth Certificate",
        uploadDate: new Date(2021, 1, 4),
        verified: false,
        verificationDate: new Date(2021, 1, 8),
      },
    ],
    ownerId: "ownerId123",
  };

  return (
    <PetProfileComponent
      officialName={petData.officialName}
      nickname={petData.nickname}
      birthDate={calculateAge(petData.birthDate)}
      sex={petData.sex}
      price={petData.price}
      profilePicture={petData.profilePicture}
      pictures={petData.pictures}
      breed={petData.breed}
      species={petData.species}
      documents={petData.documents}
      competitions={petData.competitions}
      ownerId={petData.ownerId}
    />
  );
}

function calculateAge(birthDate) {
  var ageDifMs = Date.now() - birthDate.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// connect() establishes allows the usage of redux functionality
export default connect(null, { getPet })(PetProfileView);
