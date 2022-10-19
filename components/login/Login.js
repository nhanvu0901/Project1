import React from 'react';
import { useRef, useState,useEffect } from "react";

import './Login.css'

import {  useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword ,getAuth} from "firebase/auth";


const Login  = () => {
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const auth = getAuth();
  const [errorMessageCode,setErrorMeessageCode] = useState(null)


  

  async function handleLogin() {
    
    await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((userCredential) => {
    
      const user = userCredential.user;

    })
    .catch(err => {
      let inform =" ";
      if(err.message ==='Firebase: Error (auth/wrong-password).'){
        inform = "Wrong password";
      }
      else if(err.message === 'Firebase: Error (auth/user-not-found).'){
        inform = "Account not exist";
      }
      else if(err.message === "Firebase: Error (auth/internal-error)."){
        inform = "Do not leave password emty";
      }
      else if(err.message === 'Firebase: Error (auth/invalid-email).'){
        inform = "Wrong email format";
      }
      else if(err.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
        inform = "Account has been log due to many failed login attempts";
      }
      console.log(err.message);
      setErrorMeessageCode(inform)
      
    })
    
  }
 
   
  return (
  <div className="login-page">  
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
        <label>Username</label>
          <input  ref={emailRef} placeholder="Email"/>
          
        </div>
        <div className="user-box">
        <label>Password</label>
          <input ref={passwordRef} type="password" placeholder="Password"/>
         
        </div>

        <div className="user-box">
           <p class="message">{errorMessageCode}</p>
        </div>
        
        <div class="btn-container">
        
          <a className="style" onClick={handleLogin}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
               Submit
          </a>
          

  
          <a className="style" onClick={()=>navigate('/signup')}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
               Sign Up
          </a>
          
        </div>

      </form>
    </div>
  </div>
  );
}
export default Login








