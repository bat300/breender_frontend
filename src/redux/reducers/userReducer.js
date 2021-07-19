const getUser = () => {
    if (window.localStorage["jwtToken"]) {
        let token = window.localStorage["jwtToken"];
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace("-", "+").replace("_", "/");
        let userJson = JSON.parse(window.atob(base64));
        // if token is expired delete it and return {}
        // --> User is not logged in anymore.
        if (userJson.exp > Date.now()) {
            window.localStorage.removeItem("jwtToken");
            return {};
        }
        return {
            user: {
                id: userJson._id,
                username: userJson.username,
                role: userJson.role,
                subscriptionPlan: userJson.subscriptionPlan
            }
        };
    }
    return {};
};

export default function user(state = getUser(), action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { user: action.user };
        case "LOGIN_FAILURE":
            return { error: action.error };
        case "UPDATE_SUCCESS":
            return { user: action.user };
        case "LOGIN_RESET":
            return {};
        case "LOGOUT":
            return {};
        case "GET_USER_INFO":
            return { ...state, userInfo: action.user };
        case "GET_USER_PETS":
            return { ...state, pets: action.pets };
        case "UPDATE_USER":
            return { ...state, user: action.user, userInfo: action.userInfo };
        case "GET_SELECTED_USER":
            return { ...state, selectedUser: action.user };
        case "GET_SELECTED_USER_PETS":
            return { ...state, selectedUserPets: action.pets };
        case "GET_REVIEWS_ON_USER":
            return { ...state, reviews: action.reviews };
        case "GET_REVIEWS_ON_SELECTED_USER":
            return { ...state, reviewsOnSelectedUser: action.reviews };
        case "ADD_REVIEW":
            return { ...state }
        default:
            return state;
    }
}
