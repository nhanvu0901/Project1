import React from 'react';
import { useRef, useState } from "react";
import {
   
    Routes,
    Route,
  
  } from "react-router-dom";
import Login from './Login';
import SignUp from './SignUp';
import Title from '../title/Title';
const LoginForm  = () => {
  return (
  <div class="login-form">  
    
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
            
        </Routes>
   
  </div>
  );
}
export default LoginForm








