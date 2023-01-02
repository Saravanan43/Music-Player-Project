import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'
import {sonyImg}  from '../image/image'


import { isActiveStyles,isNotActiveStyles } from '../utils/navbarContent'
import { app } from './config/firebase.config'

const Header = () => {

  const [{user},dispatch]=useStateValue();
  const [box,setBox]=useState(false);
  const navigate=useNavigate();

  const logout = () => {
    const firebase=getAuth(app);

    firebase.signOut().then(() =>{
        window.localStorage.setItem('session','false')
    }).catch((e) => console.log(e)
    )

    navigate('/login',{replace : true});
  }
  
  return (
    <div className='flex items-center w-full md:px-8 md:py-2'>
        <NavLink to={'/home'}>
        <div className='w-24 h-20'>
            <img src={sonyImg} alt='logo' className='w-full h-full' />
        </div>
        </NavLink>
        
        <div className='ml-20'>
            <ul className='flex items-center gap-7'>
                <NavLink to={'/home'} className={({isActive}) => isActive? isActiveStyles: isNotActiveStyles}><li>Home</li></NavLink>
                <NavLink to={'/music'} className={({isActive}) => isActive? isActiveStyles: isNotActiveStyles}><li>Music</li></NavLink>
                <NavLink to={'/premium'} className={({isActive}) => isActive? isActiveStyles: isNotActiveStyles}><li>Premium</li></NavLink>
                <NavLink to={'/contact'} className={({isActive}) => isActive? isActiveStyles: isNotActiveStyles}><li>Contact Us</li></NavLink>

            </ul>
        </div>

        <div className=' flex gap-4 ml-auto w-375 items-center relative hover:cursor-pointer ' onClick={()=> setBox(!box)}>
            <div className='w-20 h-20 rounded-full'>
                <img src={user?.imageURL} alt='Dp' referrerPolicy='no-referrer' className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-lg text-textColor hover:text-headingColor font-semibold'>{user?.name}</p>
                <p className='text-sm text-textColor  hover:text-headingColor '>{user?.role}</p>
            </div>
            
            
                {box && (
                <div className='absolute top-24 p-4 right-0 z-10 w-full flex flex-col bg-gray-100 gap-3  shadow-lg rounded-md ' onMouseEnter={()=> setBox(true)} onMouseLeave={()=> setBox(false)}>
                <NavLink to={'/profile'} className='text-lg text-textColor hover:font-semibold duration-150 ease-in-out'>Profile</NavLink>
                <NavLink to={'/favourites'} className='text-lg text-textColor hover:font-semibold duration-150 ease-in-out'>My Favourites</NavLink>
                <NavLink to={'/dashboard/home'} className='text-lg text-textColor hover:font-semibold duration-150 ease-in-out'>Dashboard</NavLink>
                                    
            
                <p onClick={logout} className='text-lg text-textColor hover:font-semibold duration-150 ease-in-out'>Sign Out</p>
                </div>
                )}
            
        </div>
    </div>
  )
}

export default Header