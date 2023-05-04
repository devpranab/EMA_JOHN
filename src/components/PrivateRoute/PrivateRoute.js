import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App';

const ProtectedRoute = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.email);

    if (loggedInUser.email) {
        return children;
    } else {
        return <Navigate to='/login' />;
    }

};

export default ProtectedRoute;