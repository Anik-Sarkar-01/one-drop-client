import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import toast from 'react-hot-toast';


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

    const updateUserProfile = (name, photo) => {
        setLoading(false);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    }

    const toastSuccess = (message) => {
        toast.success(`${message}`);
    }

    const toastError = (message) => {
        toast.error(`${message}`);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe;
        }
    }, [])


    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        login,
        logout,
        updateUserProfile,
        toastSuccess,
        toastError,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;