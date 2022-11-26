import { useEffect, useState } from 'react';

const useCheckUserRole = (email) => {
    const [role, setRole] = useState('');
    const [roleIsLoading, setRoleIsLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            setRole(data.role);
            setRoleIsLoading(false);
        })
        .catch(err => console.log(err))
    }, [email]);

    return [role, roleIsLoading];
};

export default useCheckUserRole;