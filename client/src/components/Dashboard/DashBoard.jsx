import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Header from '../Header'
import {BiHomeAlt} from 'react-icons/bi';
import { isActiveStyles, isNotActiveStyles } from '../../utils/navbarContent';
import DashBoardHome from './DashBoardHome';
import DashBoardSongs from './DashBoardSongs';
import DashBoardUsers from './DashBoardUsers';
import DashBoardArtist from './DashBoardArtist';
import DashboardAlbum from './DashboardAlbum';
import DashBoardAddSong from './DashBoardAddSong';
import { useStateValue } from '../../context/StateProvider';
import Alert from '../../utils/Alert'

const DashBoard = () => {
  const [{alertType},dispatch]=useStateValue();
  return (
    <>
    <div className='w-full h-auto bg-primary'>
    <Header/>
    {
      alertType && <Alert type='success'/>
    }
    <div className='w-full flex items-center justify-center gap-28 p-5'>
    <NavLink to="/dashboard/home" className={({isActive}) => (isActive ? null : isNotActiveStyles)} ><BiHomeAlt className="text-2xl text-textColor"/></NavLink>
    <NavLink to="/dashboard/song" className={({isActive}) => (isActive ? isActiveStyles: isNotActiveStyles)}>Songs</NavLink>
    <NavLink to="/dashboard/artist" className={({isActive}) => (isActive ? isActiveStyles: isNotActiveStyles)}>Artist</NavLink>
    <NavLink to="/dashboard/user" className={({isActive}) => (isActive ? isActiveStyles: isNotActiveStyles)}>Users</NavLink>
    </div>
    
    <div>
      <Routes>
      <Route path='/home' element={<DashBoardHome/>}/>
      <Route path='/song' element={<DashBoardSongs/>}/>
      <Route path='/artist' element={<DashBoardArtist/>}/>
      <Route path='/album' element={<DashboardAlbum/>}/>
      <Route path='/user' element={<DashBoardUsers/>}/>
      <Route path='/song/addSong' element={<DashBoardAddSong/>}/>
    </Routes>
    </div>
    
    
    </div>
    </>
  )
}

export default DashBoard