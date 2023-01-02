import React from 'react'
import { useEffect } from 'react'
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from '../../api'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'

const DashBoardCard = ({name,count,icon}) => {
 return (
  <div className='w-28 h-28 rounded-lg text-lg flex items-center justify-center bg-red-200 gap-2 hover:bg-red-300 cursor-pointer hover:w-120 hover:h-120 ease-in-out duration-300 transition-all text-textColor font-semibold shadow-lg'>
    <p>{name}</p>
    <p>({count})</p>
  </div>
 )
 
}

const DashBoardHome = () => {
  const [{allUsers,allArtists,allAlbums,allSongs},dispatch]=useStateValue();

  useEffect(()=>{
    if(!allSongs){
      getAllSongs().then((data)=> {
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
    if(!allArtists)
    {
      getAllArtists().then((data)=> {
         dispatch({
           type:actionType.SET_ALL_ARTIST,
           allArtists:data.allArtist
         })
      })
    }
    if(!allAlbums)
    {
      getAllAlbums().then((data)=> {
         dispatch({
           type:actionType.SET_ALL_ALBUM,
           allAlbums:data.allAlbum
         })
      })
    }
    
  },[]);
  return (
    <div className='flex w-full items-center justify-around py-20 px-40'>
       <DashBoardCard name='Songs' count={allSongs?.length > 0 ? allSongs?.length : 0} />
       <DashBoardCard name='Artists' count={allArtists?.length > 0 ? allArtists?.length : 0}/>
       <DashBoardCard name='Users' count={allUsers?.length > 0 ? allUsers?.length : 0}/>
    </div>
  )
}

export default DashBoardHome