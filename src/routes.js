import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";
import AddPetView from "./views/AddPetView";
import EditPetView from "./views/EditPetView";

// routes within the movie database example app
// used for routing

const routes = [
    {
        path: "/",
        component: MovieListView,
        exact: true,
    },
    {
        path: "/login",
        component: UserLoginView,
    },
    {
        path: "/register",
        component: SignUpView,
    },
    {
        path: "/movie/:id",
        component: MovieDetailsView,
    },
    /** @TODO added for the test, maybe need to deleted later */
    {
        path: "/add-pet",
        component: AddPetView,
    },
    {
        path: "/pet/edit/:id",
        component: EditPetView,
    },
];

export default routes;
