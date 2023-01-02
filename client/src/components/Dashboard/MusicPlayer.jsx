import React from 'react'
import { useStateValue } from '../../context/StateProvider'
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import { actionType } from '../../context/reducer';

function MusicPlayer() {
    const[{songindex,allSongs},dispatch]=useStateValue();

    const nextTrack = () => {
      dispatch({
        type:actionType.SET_SONG_INDEX,
        songindex:(songindex + 1)%allSongs.length
      })
    }

    const previousTrack = () => {
      if(songindex===0)
      {
        dispatch({
          type:actionType.SET_SONG_INDEX,
          songindex:0
        })
      }
      else{
         dispatch({
            type:actionType.SET_SONG_INDEX,
            songindex:songindex - 1
          })
      }
       
    }
  return (
    <div className='px-8 flex gap-3 w-full' >
        <div className='flex gap-3 items-center justify-center'>
            <div className='w-40 h-28'>
           <img src={allSongs[songindex]?.imageURL} alt="" className='w-full h-full rounded-lg' />
        </div>
        <div>
            <h3 className='font-semibold text-lg'>{allSongs[songindex]?.name}</h3>
            <h3 className='text-md'>{allSongs[songindex]?.artist}</h3>
        </div>
        
        </div>
        <div className="flex w-full">
          <AudioPlayer
            src={allSongs[songindex]?.songURL}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
    </div>
  )
}

export default MusicPlayer