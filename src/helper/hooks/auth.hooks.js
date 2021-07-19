
import { useSelector } from 'react-redux';

export const useUser = () => useSelector((state) => state.user.user);

export const useLoggedInUser = () => useSelector((state) => state.user.loggedInUser);


