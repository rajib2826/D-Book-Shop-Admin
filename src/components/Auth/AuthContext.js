import {
  getIdToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

const AuthContext = createContext({
  currentUser: null,
  loggedInUser: null,
  setCurrentUser: () => {},
  login: () => Promise,
  logout: () => Promise,
  setJWTToken: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // set current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // get current user from database
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, 'users', currentUser.email),
        (doc) => {
          setLoggedInUser(doc.data());
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  // login method
  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);

    const userRef = doc(db, 'users', email);
    const docSnap = await getDoc(userRef);

    // check the user database
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  }

  // set jwt token
  function setJWTToken() {
    getIdToken(auth.currentUser, true).then((idToken) => {
      localStorage.setItem('token', idToken);
    });
  }

  // login method
  function logout() {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    return signOut(auth);
  }

  const value = {
    currentUser,
    setCurrentUser,
    loggedInUser,
    setLoggedInUser,
    login,
    logout,
    setJWTToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
