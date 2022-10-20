import React from 'react';
import { useRef, useState,useEffect } from "react";

import './Login.css'

import {  useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword ,getAuth} from "firebase/auth";

import { Dna } from  'react-loader-spinner'

const Login  = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const auth = getAuth();
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

  async function handleLogin(e) {
    e.preventDefault()
    setSpin(true)
    await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value).then((userCredential) => {
      setSpin(false)
      const user = userCredential.user;
      return navigate('/profile')
    })
    .catch(err => {
      setSpin(false)
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
  <div id="login-page">
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input  ref={emailRef} placeholder="Email"/>
          <label>Username</label>
        </div>
        <div className="user-box">
          <input ref={passwordRef} type="password" placeholder="Password"/>
          <label>Password</label>
        </div>

        <div className="invisible-box">

            {spin && <Dna
              visible={true}
              height="60"
              width="60"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />}
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








