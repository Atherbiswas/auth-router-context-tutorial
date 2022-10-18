import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../firebase/firebase.config';


export const AuthContext = createContext(); 
const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser] = useState({displayName: "firebase"});
    //user register part...
    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password);
    }
    //user login part...
    const signInUser = (email,password) => {
        return signInWithEmailAndPassword(auth,email,password);
    }
    //display user email..
    useEffect(() => {
        const unSubscribe =  onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('auth state changed', currentUser);
        })
        return () => {
            unSubscribe();
        }
    },[])
    const authInfo = {user, createUser, signInUser};
    return (
        
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;