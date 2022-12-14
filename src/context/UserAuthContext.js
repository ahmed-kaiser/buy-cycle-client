import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import app from "../firebase/Firebase.init";

export const AuthContext = createContext();
const auth = getAuth(app);

const UserAuthContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSignIn = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, url) => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, { displayName:name, photoURL:url})
  };

  const userSignOut = () => {
    setIsLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
      setIsLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const sharedData = {
    userInfo,
    isLoading,
    createUser,
    updateUserProfile,
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
