import React,{useState} from 'react'
import { useEffect } from 'react';
import {IoMdAddCircle} from 'react-icons/io'
import  DashBoardSongCard  from '../Dashboard/DashBoardSongCard';
import { getAllSongs, getAllUsers } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import {NavLink,Route,Routes} from 'react-router-dom'
import DashBoardAddSong from './DashBoardAddSong';

const DashBoardSongs = () => {
  const [filter,setFilter]=useState('');
  const [focus,setFocus]=useState(false);
  const [{allSongs,allUsers,user},dispatch]=useStateValue();
  
  useEffect(()=>{
       if(!allSongs)
       {
        getAllSongs().then((data) => {
          dispatch({
            type:actionType.SET_ALL_SONG,
            allSongs:data.allsong
          })
        })
       }   

       if(!allUsers)
       {
        getAllUsers().then((data)=> {
          dispatch({
            type:actionType.SET_ALL_USER,
            allUsers:data.getAllUsers
          })
        })
       }
    
  },[])


  return (
    <div className='py-5'>
        <div className='flex gap-5 items-center justify-center'>
          <NavLink to="/dashboard/song/addSong">
            {
              user?.role==='admin' && <button className='flex gap-1 items-center justify-center border border-gray-300 p-2 rounded-md cursor-pointer opacity-400 hover:shadow-lg'>
            Add Song and Artist<IoMdAddCircle/></button>
            }
           
          </NavLink>
        
           
          {/* <input type="text" placeholder='Search here...' className={`w-60 p-2 rounded-md border border-gray-400`}
          onChange={(e)=>setFilter(e.target.value)}/> */}
        </div>

        <div className='p-10 border border-gray-300 mx-10 my-5 rounded-lg flex flex-col gap-4'>
          <p>Count : <span className='font-semibold text-xl'>{allSongs?.length}</span></p>
          <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
              {
                allSongs && allSongs.map((song,i) => 
                (
                <DashBoardSongCard data={song} id={song._id} index={i}/>
                ))
              }
          </div>
        </div>
    </div>
  )
}

export default DashBoardSongs