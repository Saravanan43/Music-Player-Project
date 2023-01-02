import React, { useState } from 'react'
import {VscTrash} from 'react-icons/vsc'
import { deleteArtist, deleteSong, getAllArtists, getAllSongs } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';

function DashBoardSongCard({data,id,isArtist,index}) {
    const [trash,setTrash]=useState(false);
    const [Delete,setDelete]=useState(false);
    const [{allSongs,isSongPlaying,songindex},dispatch]=useStateValue();
    const Deletefn = (data) =>{
      if(!isArtist)
      {
        deleteSong(data._id).then((res)=>{
          setTimeout(() => {
            alert('Song deleted Successfully')
          });
           getAllSongs().then((res)=>{
            dispatch(
              {
                type:actionType.SET_ALL_SONG,
                allSongs:res.allsong
              }
            )
        })
        setDelete(false)
        })
       
      }
      else{
        deleteArtist(data._id).then((res)=>{
          setTimeout(() => {
            alert('Artist deleted Successfully')
          });
           getAllArtists().then((res)=>{
            dispatch(
              {
                type:actionType.SET_ALL_ARTIST,
                allArtists:data.allArtist
              }
            )
        })
        setDelete(false)
        })
      }
    }

  const addToContext = () =>{
    if(!isSongPlaying && !Delete)
    {
      dispatch({
        type:actionType.SET_SONG_PLAYING,
        isSongPlaying:true
      })
    }
    if(songindex!==index)
    {
      dispatch(
        {
          type:actionType.SET_SONG_INDEX,
          songindex:index
        }
      )
    }
  } 



  return (
    <div className='relative w-48 min-w-210 p-3 shadow-lg rounded-lg hover:shadow-xl flex flex-col items-center gap-1'
    onMouseEnter={()=> setTrash(true)} onMouseLeave={()=> setTrash(false)} onClick={!isArtist && addToContext}>
        <div className='w-full h-32 p-1 hover:cursor-pointer'>
            <img src={data.imageURL
} alt="song" className='w-full h-full object-cover rounded-lg shadow-md hover:shadow-xl'/>
        </div>
        
        <p className= "text-lg font-medium text-gray-800 mr-auto ml-2 flex flex-col break-words">
            {data.name.length>15 ? `${data.name.slice(0,15)}...` : data.name}
            {
              !isArtist && (
                <p className='text-sm font-lg text-textColor'>
              {data.artist.length>18 ? `${data.artist.slice(0,18)}...` : data.artist}
            </p>
              )
            }
            
        </p>
         {
          trash && (
            <span className='text-lg text-red-400 hover:text-red-500 mr-auto mt-2 cursor-pointer '
             onClick={()=>{setDelete(true)}}>
             <VscTrash/>
        </span>
        )
         }
         {
          trash===false && (
            <span className='text-lg text-white mr-auto mt-2 cursor-pointer '>
             <VscTrash/>
        </span>
        )
         }
        {
          Delete && (
            <div className='absolute flex flex-col items-center justify-center backdrop-blur-md w-full h-full rounded-lg'>
          <p className='text-md font-medium'>Do you want to delete?</p>
          <div className='flex gap-2 items-center justify-center'>
          <button className='text-md border-gray-100 py-1 px-2 rounded-lg bg-green-400 hover:cursor-pointer hover:shadow-md' onClick={()=> Deletefn(data)}>Yes</button>
          <button className='text-md border-gray-100 py-1 px-2 rounded-lg bg-red-400 hover:cursor-pointer hover:shadow-md' onClick={()=>setDelete(false)}>No</button>
          </div>
         
         </div>
          )
        }
         
        
    </div>
  )
}

export default DashBoardSongCard