import { useSelector } from 'react-redux';

export const usePet = () => useSelector((state) => state.pets.pet);

export const usePetProfilePictureToRemove = () => useSelector((state) => state.upload.profilePictureToRemove);
export const usePetProfilePictureToUpload = () => useSelector((state) => state.upload.profilePictureToUpload);
export const usePetDocuments = () => useSelector((state) => state.upload.documents);
export const usePetCompetitions = () => useSelector((state) => state.upload.competitions);
export const usePetPictures = () => useSelector((state) => state.upload.pictures);


