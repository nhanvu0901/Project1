
import {  Route,Routes,Navigate } from 'react-router-dom'
import Dashboard from './components/page/Dashboard/Dashboard';
import Preferences from './components/page/Preferences/Preferences';
import Profile from './components/page/Profile/Profile';
import React, { useEffect } from 'react';
import LoginForm from './components/login/LoginForm';
import { useAuth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import ImageUser from './components/page/Preferences/ImageUser/imageUser';
const App =()=> {
  
  const currentUser = useAuth();
  const navigate = useNavigate();
 

  if(!currentUser) {
    return <LoginForm/>
  }
  

    return (
     
      <div>
    
        <Navbar />
          <Routes>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/album" element={<Dashboard/>}/>
            <Route exact path="/search" element={<Preferences/>}/>
            {/* <Route path="" element={<Navigate to="/profile" replace />} /> */}
            <Route exact path="/imageuser" element={<ImageUser/>}/>
          </Routes>
        
       
      </div>
    );



}
export default App