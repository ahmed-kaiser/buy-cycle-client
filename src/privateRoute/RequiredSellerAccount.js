import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserAuthContext';
import useCheckUserRole from '../hooks/useCheckUserRole';

const RequiredSellerAccount = ({ children }) => {
    const { userInfo, userSignOut } = useContext(AuthContext);
    const [role, roleIsLoading] = useCheckUserRole(userInfo?.email);
    const navigate = useNavigate();

    if(roleIsLoading) {
        return <div>Loading........</div>
    }

    if(role !== "seller") {
        return navigate('/')
    }

    return children;
};

export default RequiredSellerAccount;