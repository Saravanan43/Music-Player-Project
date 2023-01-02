import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Routes,Route, useNavigate} from 'react-router-dom';
import { Home, Login } from './components';
import {AnimatePresence} from 'framer-motion'


//firebase
import {app} from './components/config/firebase.config'
import {getAuth} from 'firebase/auth'
import { userValidate } from './api';
import { useStateValue } from './context/StateProvider';
import { actionType } from './context/reducer';
import DashBoard from './components/Dashboard/DashBoard';
import MusicPlayer from './components/Dashboard/MusicPlayer';

function App() {

  const [auth,setauth]= useState( false || window.localStorage.getItem('session')==='true');
  const[{user,isSongPlaying},dispatch] = useStateValue();
  
  const navigate=useNavigate();
  const firebaseAuth= getAuth(app);

  useEffect(()=> {
    if(window.localStorage.getItem('session')==='true')
    {
        console.log('potta');
        navigate('/dashboard/song',{replace:true});
    }
},[]);

  useEffect(
    ()=>
    {
      firebaseAuth.onAuthStateChanged((userCred) => {
        if(userCred)
        {
           userCred.getIdToken().then((token) =>
           {
           window.localStorage.setItem('session','true');
           setauth(true)
           userValidate(token).then((data) =>
           {
            dispatch({
              type:actionType.SET_USER,
              user:data,
            })
           })
           }
           )
        }
        else
        {
          window.localStorage.setItem('session','false');
          dispatch({
            type:actionType.SET_USER,
            user:null,
          })
          navigate('/login')
        }
      })
    }
  ,[])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='h-auto min-w-[680px]  flex justify-center items-center'>
      <Routes>
        <Route path='/login' element={<Login setauth={setauth}/>}/>
        <Route path='/*' element={<Home/>}/>
        <Route path='/dashboard/*' element={<DashBoard/>} />
      </Routes>
    {
      isSongPlaying && (
        <div className='fixed bottom-0 h-26 w-full flex bg-backdrop bg-slate-300 p-3 gap-5'>
           <MusicPlayer/>
        </div>
      )
    }
    </div>
    </AnimatePresence>
    
  )
}

export default App