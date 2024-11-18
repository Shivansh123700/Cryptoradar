import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo_crypto.jpeg'
import { Link } from 'react-router-dom';
import menu_icon from '../../assets/menu-icon.png'

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      window.scrollY>50 ? setSticky(true) : setSticky(false)
    })
  },[]);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false):setMobileMenu(true);
  }
  return (
    <nav className={`container ${sticky?'dark-nav':""} `}>
        <img className='logo' src={logo} alt=""/>
        <ul className={mobileMenu ? '':'hide-mobile-menu'}>
           <li><Link to='/home' > Home </Link></li> 
           <li><Link to='program' > About </Link></li> 
           <li><Link to='/alerts' > Alerts </Link></li> 
        </ul>
        <img src={menu_icon} onClick={toggleMenu} className='menu-icon' alt="" />
    </nav>
  )
}

export default Navbar
