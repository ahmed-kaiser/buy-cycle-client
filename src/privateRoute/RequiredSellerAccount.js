import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserAuthContext';
import useCheckUserRole from '../hooks/useCheckUserRole';
import Loading from '../pages/Shared/Loading';

const RequiredSellerAccount = ({ children }) => {
    const { userInfo } = useContext(AuthContext);
    const [role, roleIsLoading] = useCheckUserRole(userInfo?.email);
    const navigate = useNavigate();

    if(roleIsLoading) {
        return <Loading />
    }

    if(role !== "seller") {
        return navigate('/')
    }

    return children;
};

export default RequiredSellerAccount;