import { useSelector } from 'react-redux';

export const usePet = () => useSelector((state) => state.pets.pet);

export const useProfilePicture = () => useSelector((state) => state.pets.profilePicture);

export const usePictures = () => useSelector((state) => state.pets.pictures);

export const useDocuments = () => useSelector((state) => state.pets.documents);

export const useCompetitions = () => useSelector((state) => state.pets.competitions);
