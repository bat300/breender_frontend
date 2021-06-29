import MovieListView from './views/MovieListView';
import UserLoginView from './views/UserLoginView';
import SignUpView from './views/SignUpView';
import MovieDetailsView from './views/MovieDetailsView';
import AddPetView from './views/AddPetView';
import PetProfileView from "./views/PetProfileView";
import EmailConfirmationView from './views/EmailConfirmationView';
import Search from './components/Search';
import UserProfileView from "./views/UserProfileView";

// routes within the movie database example app
// used for routing

const routes = [
    {
        path: '/',
        component: Search,
        exact: true,
    },
    {
        path: '/login',
        component: UserLoginView,
    },
    {
        path: '/register',
        component: SignUpView,
    },
    {
        path: '/confirmation/:email/:token',
        component: EmailConfirmationView,
    },
    {
        path: '/movie/:id',
        component: MovieDetailsView,
    },
    {
        path: "/pet/:id",
        component: PetProfileView,
    },
    /** @TODO added for the test, maybe need to deleted later */
    {
        path: '/add-pet',
        component: AddPetView,
    },
    {
        path: '/user',
        component: UserProfileView,
    },
];

export default routes;
