export default function selectedPet(state = {}, action) {
    switch (action.type) {
        case 'GETPET_SUCCESS':
            return { pet: action.pet };
        case 'GETPET_ERROR':
            return { error: action.error };
        case 'CHANGE_SELECTED_PET':
            return { pet: action.pet };
        default:
            return { pet: action.pet };
    }
}
