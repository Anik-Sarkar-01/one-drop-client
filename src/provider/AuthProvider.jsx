import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setLoading(false);
        return signOut(auth);
    }

    const updateUserProfile = (updatedInfo) => {
        setLoading(false);
       return updateUserProfile(auth.currentUser, updatedInfo);
    }

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        login,
        logout,
        updateUserProfile,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("current user", currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe;
        }
    }, [])


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;