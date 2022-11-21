import React from 'react';
import { useRef, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Redirect,
  } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Title from '../title/Title';
import ResetPass from './ResetPass';
const LoginForm  = () => {
  return (
  <div id="login-form">  
    <Title title={'Login to your Firebase album picture'}/>
        
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            <Route exact path="/resetpass" element={<ResetPass/>}/>
        </Routes>
   
  </div>
  );
}
export default LoginForm








