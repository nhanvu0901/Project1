  import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection, 

  onSnapshot,//return real time data
  query, 
  orderBy
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {

  const auth = getAuth();
  const userId = auth.currentUser.uid;

    const ref = collection(db,"user",userId,"image");
    const q = query(ref,orderBy('createdAt',"desc"))
    const unsub =  onSnapshot(q,(snapshot)=>{ // similiar to getDocs but this return real time data more pratical
      let books =[];
      snapshot.docs.forEach(doc=>{
        books.push({...doc.data(), id: doc.id })
      })
      setDocs(books)
    });
    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [collectionName]);

  return { docs };
}

export default useFirestore;