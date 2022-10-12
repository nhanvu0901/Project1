import React from 'react';
import { useRef, useState } from "react";
import {
    Routes,
    Route,
  } from "react-router-dom";
import Login from './Login';

import Title from '../title/Title';
const LoginForm  = () => {
  return (
  <div class="login-form">  
    
        
        <Routes>
            <Route exact path="/" element={<Login/>}/>
            
            
        </Routes>
   
  </div>
  );
}
export default LoginForm








