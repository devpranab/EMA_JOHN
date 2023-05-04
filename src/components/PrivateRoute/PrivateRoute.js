import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const ProtectedRoute = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  if (!loggedInUser.email) {
    return <Navigate to='/login' />;
  } else {
    return children;
  }
};

export default ProtectedRoute;