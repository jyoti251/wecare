"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  userData: any | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
           const userDocRef = doc(db, "users", currentUser.uid);
           const userDoc = await getDoc(userDocRef);
           
           if (!userDoc.exists()) {
             // Create user document if it doesn't exist
             const newUserData = {
               uid: currentUser.uid,
               email: currentUser.email,
               displayName: currentUser.displayName,
               photoURL: currentUser.photoURL,
               createdAt: new Date().toISOString()
             };
             await setDoc(userDocRef, newUserData, { merge: true });
             setUserData(newUserData);
           } else {
             // In case displayName was null, update it if it's there now.
             if (currentUser.displayName && !userDoc.data().displayName) {
               await setDoc(userDocRef, { displayName: currentUser.displayName }, { merge: true });
               setUserData({ ...userDoc.data(), displayName: currentUser.displayName });
             } else {
               setUserData(userDoc.data());
             }
           }
        } catch (error) {
           console.warn("Could not fetch or create user document in Firestore, falling back to local user data. Error:", error);
           setUserData({
             uid: currentUser.uid,
             email: currentUser.email,
             displayName: currentUser.displayName,
             photoURL: currentUser.photoURL,
           });
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
      const newUserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
        photoURL: userCredential.user.photoURL,
        createdAt: new Date().toISOString()
      };
      try {
        await setDoc(doc(db, "users", userCredential.user.uid), newUserData, { merge: true });
      } catch (e) {
        console.warn("Could not save user document to Firestore, check your rules:", e);
      }
      
      setUser({ ...userCredential.user, displayName: name } as User);
      setUserData(newUserData);
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
