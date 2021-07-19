const initialState = {
    pets: [],
    pet: {},
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
        case 'CLEAR_PET':
            return { ...state };
        default:
            return state;
    }
};

export default pets;
