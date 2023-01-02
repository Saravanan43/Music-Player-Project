import React from 'react'
import { getAllArtists } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider'
import DashBoardSongCard from './DashBoardSongCard';

const DashBoardArtist = () => {
  const [{allArtists},dispatch]=useStateValue();
  if(!allArtists)
  {
    getAllArtists().then((data) =>{
      dispatch({
        type:actionType.SET_ALL_ARTIST,
        allArtists:data.allArtist
      })
    })
  }
  return (
    <div>
       <div className='p-10 border border-gray-300 mx-10 my-5 rounded-lg flex flex-col gap-4'>
          <p>Count : <span className='font-semibold text-xl'>{allArtists?.length}</span></p>
          <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
              {
                allArtists && allArtists.map((artist) => 
                (
                <DashBoardSongCard data={artist} id={artist._id} isArtist={true}/>
                ))
              }
          </div>
        </div>
    </div>
  )
}

export default DashBoardArtist