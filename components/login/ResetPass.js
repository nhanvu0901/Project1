import React from 'react';
import { useRef, useState,useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { Dna } from  'react-loader-spinner'
import {  sendPasswordResetEmail } from "firebase/auth";
import {firebaseApp} from '../../firebase';
import { getAuth} from "firebase/auth";
const ResetPass  = ({}) => {
  
  const emailRef = useRef();
  const auth = getAuth(firebaseApp);


  const navigate = useNavigate();
  
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
    const restoredEmail = emailRef.current.value;
   
    sendPasswordResetEmail(auth, restoredEmail).then(()=>{
        alert("Check the email to reset the password")
        
        
      }).catch((err)=>{
        console.log(err.message);
      })
  };
  
  


  
  return (
  <div id="login-page">
    <div class="login-box">
      <h2>Reset Password</h2>
      <form>


        <div className="user-box">
          <input type="email"  ref={emailRef} placeholder="Email"/>
          <label>Username</label>
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
export default ResetPass








