import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserAuthContext';
import useCheckUserRole from '../hooks/useCheckUserRole';

const RequireAdmin = ({ children }) => {
    const { userInfo, userSignOut } = useContext(AuthContext);
    const [role, roleIsLoading] = useCheckUserRole(userInfo?.email);
    const navigate = useNavigate();

    if(roleIsLoading) {
        return <div>Loading........</div>
    }

    if(role !== "admin") {
        return navigate('/')
    }

    return children;
};

export default RequireAdmin;