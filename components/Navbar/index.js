import React, { useState, useEffect } from "react";
import {
  NavLink
} from './NavbarElements';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import { logout } from "../../firebase";
import { getAuth } from "firebase/auth";
const Navbar = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeNav,setActiveNav] = useState(null)
  const auth = getAuth();
  const userId = auth.currentUser.uid;


  const navigate = useNavigate();
 
  async function handleLogout() {
   
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    navigate('/', { replace: true })
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    if(userId){
        navigate('profile', { replace: true })
        setActiveNav('Profile')
    }
    
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
      
    };

   
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };


  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  
  const onActive = (e)=>{
    e.preventDefault();
   console.log(e.currentTarget.textContent)
   setActiveNav(e.currentTarget.textContent)
   var domain = "/" +e.currentTarget.textContent.toLowerCase();
   navigate(domain, { replace: true })
  

   }





  return (
    <>
     <header className="Header" >
      <div className="logo"><h3 className="neon"><Link to='/profile'>Nhân Vũ</Link></h3></div>
     <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
       
           <nav className="Nav">
              <NavLink to='/profile' activeStyle onClick={onActive} className={activeNav === "Profile" ? "on-active":"off-ative"} >
                 Profile
              </NavLink>
              <NavLink to='/album' activeStyle onClick={onActive}  className={activeNav === "Album" ? "on-active":"off-ative"}>
               Album 
              </NavLink>
              <NavLink to='/search' activeStyle onClick={onActive}  className={activeNav === "Preference" ? "on-active":"off-ative"}>
               Search
              </NavLink>

              <NavLink to='/' activeStyle onClick={handleLogout} >
                Log Out
              </NavLink>
             
            </nav>
        </CSSTransition>
        <button onClick={toggleNav} className="Burger">🍔</button>
      </header>
    </>
  );
}
  
export default Navbar;