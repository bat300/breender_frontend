const initialState = {
    pets: [],
    pet: {},
    profileUrl: '',
    pictures: [],
    documents: [],
    competitions: [],
};

const pets = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PETS':
            return { ...state, pets: action.pets };
        case 'DELETE_PET':
            return { ...state, pets: action.pets };
        case 'ADD_PET':
            return { ...state };
        case 'UPDATE_PET':
            return { ...state, pet: action.pet };
        case 'GET_PET':
            return { ...state, pet: action.pet };
        case 'UPDATE_PROFILE_PICTURE':
            return { ...state, profileUrl: action.profileUrl };
        case 'UPDATE_PICTURES':
            return { ...state, pictures: action.pictures };
        case 'UPDATE_DOCUMENTS':
            return { ...state, documents: action.documents };
        case 'UPDATE_COMPETITIONS':
            return { ...state, documents: action.competitions };
        default:
            return state;
    }
};

export default pets;
