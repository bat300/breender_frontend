import { useSelector } from 'react-redux';

// @ts-ignore
export const useProfilePicture = () => useSelector((state) => state.pets.profileUrl);

// @ts-ignore
export const usePictures = () => useSelector((state) => state.pets.pictures);

// @ts-ignore
export const useDocuments = () => useSelector((state) => state.pets.documents);

// @ts-ignore
export const useCompetitions = () => useSelector((state) => state.pets.competitions);
