
import LoginForm from './components/login/LoginForm';
import React, { useEffect } from 'react';
import { useAuth } from './firebase';
import { logout } from "./firebase";
import './App.css'


const App =()=> {
  const currentUser = useAuth();

 async function handleLogout() {

    try {
      await logout();
    } catch {
      alert("Error!");
    }

  }
  

  if(!currentUser) {
    return <LoginForm/>
  }

    return (
     
      <div>  
        <h1>Hello World</h1>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );



}
export default App