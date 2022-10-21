import { useEffect, useState,useRef, useId } from "react";
import { useAuth, upload } from "../../../firebase"
import { updateProfile } from "firebase/auth";

import './profile.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { doc,updateDoc,getDoc, } from 'firebase/firestore';
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [displayName,setDisplayName] = useState(null)
  const [displayJob,setDisplayJob] = useState("Job:")
  const [displayPresent,setDisplayPresent] = useState("Present:")




  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const emailRef = useRef();


  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  async function handleClick() {
    var displayNameEdit= document.getElementById("display-name").innerHTML;
    var displayJobEdit= document.getElementById("job").innerHTML;
    var displayPresentEdit= document.getElementById("present").innerHTML;


    if(photo){
      upload(photo, currentUser, setLoading);

    }


    if(displayNameEdit !== displayName || displayJobEdit !== "Job:" || displayPresent !=="Present:"){

      await updateProfile(currentUser, {
        displayName: displayNameEdit,

      });

      const docRef =doc(db,"user",userId);
      setDisplayJob(displayJobEdit)
      setDisplayPresent(displayPresentEdit)
      updateDoc(docRef,{
        job:displayJobEdit,
        present:displayPresentEdit
      }).then(()=>{
        console.log("Ok mf")
       })
       .catch(error=>{
        console.log(error)
       })
    }
  }
   useEffect(() => {
    if(currentUser){
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
      }
      if (currentUser?.displayName){
        setDisplayName(currentUser.displayName)
      }
      if(currentUser?.email){
        emailRef.current = currentUser.email
      }
    }
    const fetchData = async () => {
        const docRef =doc(db,"user",userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {

          setDisplayJob(docSnap.data().job)
          setDisplayPresent(docSnap.data().present)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

    }
    fetchData();

  }, [currentUser,displayJob,displayPresent])


  function handleChange(e) {
    if (e.target.files[0]) {
      const preview = document.querySelector('.avatar-edit');
      const file = e.target.files[0]
      const reader = new FileReader();
      setPhoto(e.target.files[0])
      reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);//doc file anh thanh url
      }
    }

  }
  return (

      <div className="main-contain" style={{
        minHeight: '100vh',
        height:'100%',

        width:'100%',

      }}>


        <div className="profile-container">

          <div className="avatar-flip">
            <img className="avatar-edit"  height="150" src={photoURL} width="150"/>

            <img src="http://i1112.photobucket.com/albums/k497/animalsbeingdicks/abd-3-12-2015.gif~original" height="150" width="150"/>
          </div>
          <div className="avatar-upload">
            <input onChange={handleChange} type="file" id="imageUploadEdit" accept=".png, .jpg, .jpeg"/>
            <label for="imageUploadEdit" className='upload-label'><FontAwesomeIcon icon={faPencil} /></label>
          </div>

          <h2 contenteditable="true" id="display-name">{displayName}</h2>
          <h4>Email:{emailRef.current}</h4>

          <div className="info">
            <div className="info-box">
              <FontAwesomeIcon icon={faBagShopping} />
              <p contenteditable='true' id="job">{displayJob}</p>
            </div>
            <div className="info-box">
              <FontAwesomeIcon icon={faUser} />
              <p contenteditable='true' id="present">{displayPresent}</p>
            </div>
          </div>

          <button onClick={handleClick} class="button-49" role="button">Edit</button>
        </div>

        <div class="blob"></div>

      </div>



  );
}