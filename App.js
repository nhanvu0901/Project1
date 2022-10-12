
import LoginForm from './components/login/LoginForm';
import React, { useEffect } from 'react';
import { useAuth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { logout } from "./firebase";
import './App.css'


const App =()=> {
  const currentUser = useAuth();
 

  

  if(!currentUser) {
    return <LoginForm/>
  }

    return (
     
      <div>  
        <h1>Hello World</h1>
      
      </div>
    );



}
export default App