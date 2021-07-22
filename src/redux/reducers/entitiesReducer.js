export default function entities(state = {}, action) {
    switch (action.type) {
        case 'GETPETS_SUCCESS':
            return { pets: action.pets, totalPages: action.totalPages };
        case 'GET_DOCUMENTS_SUCCESS':
            return { documents: action.documents };
        case 'GETMOVIES_SUCCESS':
            return { movies: action.movies };
        case 'DELETEMOVIE_SUCCESS':
            return { movies: action.movies };
        case 'ADDMOVIE_SUCCESS':
            return { ...state };
        default:
            return state;
    }
}
