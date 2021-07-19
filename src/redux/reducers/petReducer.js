const initialState = {
    pets: [],
    pet: {
        profilePicture: undefined,
        pictures: [],
        documents: [],
        competitions: [],
    },
};

const pets = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PETS':
            return { ...state, pets: action.pets };
        case 'DELETE_PET':
            return { ...state };
        case 'ADD_PET':
            return { ...state };
        case 'UPDATE_PET':
            return { ...state, pet: action.pet };
        case 'GET_PET':
            return { ...state, pet: action.pet };
        case 'UPDATE_SELECTED_PET':
            return { ...state, pet: action.pet };
        case 'UPDATE_PROFILE_PICTURE':
            return { ...state, profilePictureToRemove: action.profilePictureToRemove };
        case 'CLEAR_PET':
            return { ...initialState };
        default:
            return state;
    }
};

export default pets;
