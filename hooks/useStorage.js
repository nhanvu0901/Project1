import { useState, useEffect } from 'react';

import {
  setDoc,
  doc,

  serverTimestamp, // order the database 
  increment,
  updateDoc,
  FieldValue
} from 'firebase/firestore'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db ,storage,useAuth} from '../firebase';

import { getDatabase, set,ref as ref_database } from "firebase/database";

import { getAuth } from "firebase/auth";


const useStorage = (file,text,album) => {
  const [progress, setProgress] = useState(0);
  const auth = getAuth();
  const [imageUrl, setUrl] = useState(null);
  const realTimeData = getDatabase();
 
  const userId = auth.currentUser.uid;
    // references
   

   useEffect(()=>{
    const metadata = {
      contentType: 'image/jpeg/gif/png/mp4'
    };
    var idImageGenerate = Date.now().toString();
      const storageRef = ref(storage,userId+idImageGenerate);
      console.log(file)
    const uploadTask = uploadBytesResumable(storageRef, file,metadata);
    
   
    console.log()
    const imageRef = doc(db,"user",userId,"image",idImageGenerate); // userid


    uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

     
    
      setProgress(progress);
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          console.log(" User doesn't have permission to access the object")
          break;
        case 'storage/canceled':
          console.log(" User canceled the upload")
          break;
        case 'storage/unknown':
          console.log("Unknown error occurred, inspect error.serverResponse")
          break;
      }
    }, 
    () => {
   
      // toast("🦄 Thêm ảnh thành công hehe !");
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUrl(downloadURL);
        


      //   const docData = {   nested data generate unique id and 
      //                       inside is the data of that picture
      //     {
      //     {

      //     }
      //   }
      // };



        setDoc(imageRef,{
          url:downloadURL,
          name:file.name,
          note:text,
          type:file.type,
          createdAt: serverTimestamp(),
          user:userId,
          idImage : idImageGenerate,
          
        });  
        const docRef =doc(db,"user",userId);
      
        updateDoc(docRef,{
          numOfPic: increment(1)
        }).then(()=>{
          console.log("Ok mf")
         })
         .catch(error=>{
          console.log(error)
         })
      
      });

    },
  );
 },[file])
  
  return { progress, imageUrl};
}

export default useStorage;