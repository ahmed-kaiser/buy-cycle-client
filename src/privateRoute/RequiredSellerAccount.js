import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/UserAuthContext';

const RequiredSellerAccount = ({ children }) => {
    const { userInfo, userSignOut } = useContext(AuthContext);
    const [isSeller, setIsSeller] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${userInfo.email}`)
        .then(res => res.json())
        .then(data => {
            if (data[0].account_type === 'seller') {
                setIsSeller(true);
            }
            setIsLoading(false);
        })
    }, [userInfo.email]);

    if(isLoading) {
        return <div>loading......</div>
    }else if(!isLoading && !isSeller) {
        userSignOut()
        .then(() => navigate('/sign-in'))
        .catch(err => console.log(err))
    }else{
        return children;
    }
};

export default RequiredSellerAccount;