import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";
import EmailConfirmationView from "./views/EmailConfirmationView";
import Search from "./components/Search";

// routes within the movie database example app
// used for routing

const routes = [
    {
        path: "/",
        component: Search,
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
        path: "/confirmation/:email/:token",
        component: EmailConfirmationView,
    },
    {
        path: "/movie/:id",
        component: MovieDetailsView,
    },
];

export default routes;
