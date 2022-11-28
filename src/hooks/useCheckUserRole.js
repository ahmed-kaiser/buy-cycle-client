import { useEffect, useState } from "react";

const useCheckUserRole = (email) => {
  const [role, setRole] = useState("");
  const [roleIsLoading, setRoleIsLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`https://buy-cycle-server.vercel.app/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role);
          setRoleIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [email]);

  return [role, roleIsLoading];
};

export default useCheckUserRole;
