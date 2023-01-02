import React from 'react'
import { useEffect,useState } from 'react'
import {IoIosArrowDropdown} from 'react-icons/io'
import { getAllAlbums, getAllArtists,getAllSongs,saveArtist,saveSongs } from '../../api'
import {allArtists,allAlbums,allSongs} from '../../context/initialState'
import {useStateValue} from '../../context/StateProvider'
import {actionType} from '../../context/reducer'
import {AiOutlineUpload} from 'react-icons/ai'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from '../config/firebase.config'
import SongsUpload from '../Dashboard/SongsUpload'
import AddAudio from './AddAudio'
import ArtistUpload from './ArtistUpload'


const DashBoardAddSong = () => {
  
  const language =[
    {name:'English'
    },
    {name:'Tamil'
    },
    {name:'Hindi'
    },
    {name:'Telugu'
    },
    {name:'Urdu'
    },
    {name:'Kannada'
    },
  ]

  const Category =[
    {name:'Western'
    },
    {name:'Classic'
    },
    {name:'Hip-Hop'
    },
    {name:'Koothu'
    },
  ]
  const [{allArtists,allAlbums,filterArtist,filterAlbum,filterLanguage},dispatch]=useStateValue();
  
  
  useEffect( () => {
     if(!allArtists)
     {
      getAllArtists().then((data)=>{
        dispatch({
          type:actionType.SET_ALL_ARTIST,
           allArtists:data.allArtist
          })
      })
     }

     if(!allAlbums)
     {
      getAllAlbums().then((data)=>{
        dispatch({
          type:actionType.SET_ALL_ALBUM,
           allAlbums:data.allAlbum
          })
      })
     }
  },[])
  const [songName,setSongName]=useState(null)
  const [songURL,setSongURL]=useState(null)
  const [songCover,setSongCover]=useState(null)

  const SaveSong = () =>{
    if(!setSongCover || !setSongURL)
    {
        alert('Fill the required fields...')
    }
    else
    {
    
     //setLoader(!loader)
     setSongImage("")
     setImage("")
      const data ={
      name:songNam,
     imageURL:songCover,
     songURL:songURL,
     artist:filterArtist
    }
    
   saveSongs(data).then(()=>{
    getAllSongs().then((songs)=>
    {
      dispatch({
        type:actionType.SET_ALL_SONG,
        allSongs:songs.allsong
      })
    })})
  
    
    alert('Uploaded Successfully')
    window.location.reload();
    setSongNam('')
    dispatch({
      type:actionType.SET_FILTER_ARTIST,
      filterArtist:null
    })
    dispatch({
      type:actionType.SET_FILTER_ALBUM,
      filterAlbum:null
    })
    dispatch({
      type:actionType.SET_FILTER_LANGUAGE,
      filterLanguage:null
    })
    dispatch({
      type:actionType.SET_FILTER_CATEGORY,
      filterCategory:null
    })
    }
    
  }

  const SaveArtist = () => {
    if(artistName.length>0 && artistImage.length>0)
    {
      const data={
        name:artistName,
        imageURL:artistImage
      }
      
      saveArtist(data)
      .then(()=>{
        getAllArtists().then((artist)=>{
          dispatch({
            type:actionType.SET_ALL_ARTIST,
            allArtists:artist.allArtist
          })
        })
      })

      alert('Uploaded Successfully')
      window.location.reload(); 
      setArtistName('')
      setArtistImage('')

    }
  }
  const [loader,setLoader]=useState(true)
  const [songImage,setSongImage]=useState('')
  const [image,setImage]= useState('')
  const [songNam,setSongNam]=useState('')
  const [artistName,setArtistName]=useState('')
  const [artistImage,setArtistImage]=useState('')

  const setNamefn = (e) =>{
    setSongNam(e.target.value)
  }
  const setArtistNamefn = (e) => {
    setArtistName(e.target.value)
  }

  
  return (
    <div className='px-20 py-5 m-5 border border-gray-500 flex flex-col gap-2 items-center justify-center'>
         <h3 className='font-bold text-lg'>Upload Song Information</h3>
         <div className='w-1/2'>
             <input type="text" className='w-full p-2 rounded-lg' placeholder='Type your Song name...' onChange={setNamefn}/>
         </div>

         <div className='w-1/2 flex items-center justify-evenly gap-10'>
         <SongButton name='Artist' data={allArtists} />  
         </div>

         <div className='w-1/2 '>
          <div className='flex flex-col gap-4 items-center justify-center'>
            <div className='w-full h-300 border border-gray-500 rounded-lg bg-slate-50'>
            <SongsUpload ImageURL={setSongCover} image={songImage} setLoader={setLoader} setImage={setSongImage}/>
          </div>
          <div className='w-full h-300 border border-gray-500 rounded-lg bg-slate-50'>
            <AddAudio SongURL={setSongURL} SongName={setSongName} loader={loader} setLoader={setLoader} image={image} setImage={setImage}/>
          </div>
          <div className='items-center justify-center'>
            {(songName && songCover && songURL) ?
          <button className='px-3 py-1 rounded-lg bg-red-500 hover:shadow-lg' onClick={() => SaveSong()}> Save Song</button>
          :
          <button className='px-3 py-1 rounded-lg bg-red-600' onClick={()=>setLoader(!loader)}>
            Save Song
            </button>}
          </div>
          
          </div>
          <div className='flex flex-col gap-4 items-center justify-center my-5'>
            <h3 className='font-bold text-lg'>Upload Artist Information</h3>
            <input type="text" className='w-full p-2 rounded-lg' placeholder='Type your Artist name...' onChange={setArtistNamefn}/>
            <div className='w-full h-300 border border-gray-500 rounded-lg bg-slate-50'>
            <ArtistUpload setImageURL={setArtistImage} setname={setArtistName} name={artistImage}/>
          </div>
          <div className='items-center justify-center'>
            {(artistName && artistImage) ?
          <button className='px-3 py-1 rounded-lg bg-red-500 hover:shadow-lg' onClick={() => SaveArtist()}> Save Artist</button>
          :
          <button className='px-3 py-1 rounded-lg bg-red-600' >
            Save Artist
            </button>}
            <div className='h-48'></div>
          </div>
          
          </div>
         </div>
    </div>
  )
}


const SongButton = ({name,data}) => {
  const [flag,setFlag]=useState(false)
  const [filter,setFilter]=useState(null)
  const [{filterArtist,filterCategory,filterAlbum,filterLanguage},dispatch]=useStateValue();
  const updateFilter = (prop,name) => {
    setFlag(false);
    setFilter(prop);
    if(name==='Artist')
    {
        dispatch({
          type:actionType.SET_FILTER_ARTIST,
          filterArtist:prop
        })
        
    }
    else if(name==='Album')
    {
      dispatch({
        type:actionType.SET_FILTER_ALBUM,
        filterAlbum:prop
      })
      
    }
    else if(name==='Language')
    {
      dispatch({
        type:actionType.SET_FILTER_LANGUAGE,
        filterLanguage:prop
      })
      
    }
    else if(name==='Category')
    {
      dispatch({
        type:actionType.SET_FILTER_CATEGORY,
        filterCategory:prop
      })
      
    }
    //console.log({filterArtist});
  }
  
  return (
    
    <div className='relative w-1/4'>
      <button onClick={()=>setFlag(!flag)}  className='w-full text-gray-800 flex gap-2 items-center border border-gray-500 p-1 rounded-lg justify-center hover:shadow-md'>
        {!filter && name}
        {
          filter && (
            <>
            {
              filter.length > 8 ? `${filter.slice(0,7)}..` : filter
              
            }
            </>
            )
        }
        {
          !flag && <IoIosArrowDropdown/>
        }
        {
          flag && <IoIosArrowDropdown className='rotate-180'/>
        }
        </button>
      {
        data && flag && (
        <div className='absolute w-full h-20 flex flex-col gap-1 bg-slate-100 scrollbar-thin 
       scrollbar-thumb-gray-400 scrollbar-track-gray-200  shadow-md transition-all duration-100 ease-in-out 
       overflow-y-scroll items-center justify-start rounded-md my-3'  >
      {
          data?.map((i) => (
            <div className='flex  gap-2 items-center justify-center py-2 hover:cursor-pointer' onClick={()=> updateFilter(i.name,name)}>
               {
                (name === 'Artist' || name === 'Album') && (
                  <div className='w-12 h-12'>
                  <img src={i.imageURL} alt="buttonpic" className='w-full h-full rounded-full object-cover' />
                  </div>
                   
                )
               }
              <p className=' w-1/2 text-md font-semibold text-textColor hover:text-gray-300'>{i.name.length > 8 ? `${i.name.slice(0,8)}...` : i.name}</p>
            </div>
          ))
        } 
      </div>
     )
      }
      
    </div>
    )
}


 

export default DashBoardAddSong