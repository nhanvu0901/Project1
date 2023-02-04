import React from 'react';
import './preference.css'

import {  useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from 'react-router-dom'
const Preferences  = () => {
  const [userData, setUserData] = useState(null);
  const [autoSearch,setAutoSearch] = useState(null)
  const navigate = useNavigate();
  async function onChangeSearch(e){
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, "user"));
    let userEmail = e.target.value
    
    let user_data = []
    querySnapshot.forEach((user) => {
      // doc.data() is never undefined for query doc snapshots
      
      if(user.data().email.match(userEmail) && userEmail != ''){
        user_data.push(user.data())
      }
     
      
    });
    setAutoSearch(userEmail)
    setUserData(user_data)
  
    
  }
  function onClearInput(e){
    // document.getElementById('myInput').value = ''
    setAutoSearch('')
    console.log(autoSearch)
  }


  function OnOpenUserImage(e){
    e.preventDefault();
    
    console.log("hello")
    const userName = e.currentTarget.getAttribute("user-name");//currentTarget khac gi -->tim hieu di
    const userUid = e.currentTarget.getAttribute("user-uid");
    const userEmail = e.currentTarget.getAttribute("user-email");
    const userAva = e.currentTarget.getAttribute("user-ava");
    const userJob = e.currentTarget.getAttribute("user-job");
    const userPresent = e.currentTarget.getAttribute("user-present");
   
    console.log(userName)
    navigate('/imageuser', { state: { 
      userName: userName, 
      userUid:userUid,
      userEmailL:userEmail,
      userAva:userAva,
      userJob:userJob,
      userPresent:userPresent,
      
    } });
  }

    return(
      <div className="main-search" style={{
        minHeight: '100vh',
        height:'100%',
       
        width:'100%',
        paddingTop:'4rem'
      }}>
        <h1 className='title'>Search User Email</h1>
        <div class="search">
            <input type="checkbox" id="trigger" class="search__checkbox" />
            <label class="search__label-init" for="trigger"></label>
            <label class="search__label-active" for="trigger" onClick={onClearInput}></label>
            <div class="search__border"></div>
            <input type="text" class="search__input" id="myInput" onChange={onChangeSearch} placeholder="Type user email here"/>
            <div class="search__close"></div>



            <ul className='list-bio'>
            {autoSearch !=='' && userData && userData.map(data=>{
              return(
                
                <li className ="card" onClick={OnOpenUserImage} user-name={data.name} user-uid={data.uid} 
                user-email={data.email} 
                user-job={data.job} user-ava={data.photoURL} user-present={data.present}
                >
                  <img className='search-avatar' src={data.photoURL} height="150" width="150"/>
                  <div className='text-container'>
                    <h4>{data.name} ({data.email})</h4>
                    <span><span className='bio-card'>Job: </span> {data.job}</span>
                    <span><span className='bio-card'>Bio: </span> {data.present}</span>
                    <span><span className='bio-card'>Pic: </span> {data.numOfPic}</span>
                  </div>
                </li>
                )
              })
          }
        </ul>
        </div>
        <div class="blob"></div>
      </div>
    );
}
export default Preferences