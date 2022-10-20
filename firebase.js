import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0f74tCYu0_m1nf1i-UU0dsm0Hn0oLVKY",
  authDomain: "test-b0548.firebaseapp.com",
  databaseURL: "https://test-b0548-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-b0548",
  storageBucket: "test-b0548.appspot.com",
  messagingSenderId: "1044510370275",
  appId: "1:1044510370275:web:a3a0b98663581139de98d6",

};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(firebaseApp);
const db = getFirestore() 

export function logout() {
  return signOut(auth);
}

// Custom Hook
export  function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');
  const metadata = {
    contentType: 'image/jpeg/gif/png/mp4'
  };
  setLoading(true);
  
  await uploadBytesResumable(fileRef, file,metadata);
  const photoURL = await getDownloadURL(fileRef);

  await updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  window.location.pathname = `/profile`;
}
export { db ,storage ,firebaseApp};