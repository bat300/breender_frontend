import { useSelector } from 'react-redux';

export const usePet = () => useSelector((state) => state.pets.pet);

export const useProfilePicture = () => useSelector((state) => state.pets.profilePictureToRemove);

