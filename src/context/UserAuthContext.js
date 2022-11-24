import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/Firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserAuthContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignIn = (email, password) => {
    return signInWithEmailAndPassword(email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
  }, []);

  const sharedData = {
    userInfo,
    createUser,
    userSignIn,
    userSignOut,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={sharedData}>
        {children}
    </AuthContext.Provider>
  );
};

export default UserAuthContext;
