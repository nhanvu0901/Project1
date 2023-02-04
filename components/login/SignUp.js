import React from 'react';
import { useRef, useState,useEffect } from "react";
import { db } from '../../firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './Login.css'
import { useNavigate } from 'react-router-dom';

import {  upload } from "../../firebase";
import { getAuth, updateProfile,createUserWithEmailAndPassword } from "firebase/auth";
import { Dna } from  'react-loader-spinner'
const SignUp  = ({}) => {
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  
  const auth = getAuth();


  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [errorMessageCode,setErrorMeessageCode] = useState(null)
  const [spin,setSpin] = useState(null)
  useEffect(() => {
    if(errorMessageCode){
      const timer = setTimeout(() => {
        
        setErrorMeessageCode('');
      }, 5000);
      return () => clearTimeout(timer);
    }
    
  }, [errorMessageCode]);



  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

   
    
   
    if (email && name && password && photo ) {
      registerUser(email, name, password).then(() => {
          
      


        
      })
    }
    else{
      setErrorMeessageCode("Fill all the input include photo")
    }
  };
  
  
  const registerUser = async (email, name, password) => {
    try {
      setSpin(true)

      const {
        user
      } = await createUserWithEmailAndPassword(auth, email, password).catch(err => {
     
      let inform =" ";
      if(err.message ==='Firebase: Error (auth/email-already-in-use).'){
        inform = "Email already in use";
      }
      else if(err.message ==='Firebase: Password should be at least 6 characters (auth/weak-password).'){
        inform = "Password should be at least 6 characters"
      }

      console.log(err.message);
      setSpin(false)
      setErrorMeessageCode(inform)
      return null
    })
     

     

      if(photo){
        await upload(photo, user, setLoading,email,name,password);
      }


      console.log("> Updating profile")
      await updateProfile(user, {
        displayName: name,

      });
      
    

    } catch (e) {
      console.log(e)
    }
    if(spin ==false ){
      navigate('/profile')
    }
    
  }

  useEffect(() => {
   
    if(photo){
      
      setPhotoURL(photo)
    }
    
  }, [photo])


  function handleChange(e) {
    if (e.target.files[0]) {
      const preview = document.querySelector('img');
      const file =e.target.files[0]
      const reader = new FileReader();
      setPhoto(e.target.files[0])
      reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
      }, false);
    
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    
  }
  return (
  <div id="login-page">
    <div class="login-box">
      <h2>Sign Up</h2>
      <form>


      <div className='avatar-edit'>
         <img src={photoURL} alt="Avatar" className="avatar" />
         <input type="file" onChange={handleChange} id="imageUpload" accept=".png, .jpg, .jpeg"/>
         <label for="imageUpload" className='upload-box'><FontAwesomeIcon icon={faPencil} /></label>
      </div>
      
      
      
        <div className="user-box">
          <input  ref={emailRef} placeholder="Email"/>
          <label>Username</label>
        </div>
        <div className="user-box">
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <label>Password</label>
        </div>

        <div className="user-box">
          <input ref={nameRef} placeholder="Name"/>
          <label>User's nick name</label>
        </div>

        <div className="invisible-box">
           <p class="message">{errorMessageCode}</p>
          {spin && <Dna
              visible={true}
              height="60"
              width="60"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />}
        </div>

        <div class="btn-container">
              <a className="style" onClick={onSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Submit
              </a>
           
          
          
            <a className="style" onClick={()=>navigate('/')}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
                Log In
            </a>
          
        </div>

      </form>
    </div>
  </div>
  );
}
export default SignUp








