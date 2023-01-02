import React from 'react'
import { useState } from 'react'
import {AiOutlineUpload} from 'react-icons/ai'
import { storage } from '../config/firebase.config'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import {MdDelete} from 'react-icons/md'

function SongsUpload({ImageURL,image,setImage}) {

   const [loader,setLoader]=useState(true) 
   const [progress,setProgress]=useState(0)
  // const [image,setImage]= useState('')
   const [isImage,setIsImage]=useState(false)
  
  const deleteImage = (type,url) =>{
    
    
    setLoader(false);
    const deleteRef=ref(storage,url);
    deleteObject(deleteRef).then(() => {
      setImage('')
      setLoader(true)
      ImageURL(null)
    })
  }

  return (
    <div className='w-full h-full'>
        {!loader && <ImageUploader progress={progress}/>}
        {loader && 
        (image.length===0 ? <FileUpload setURL={ImageURL} loaderfn={setLoader} progressfn={setProgress} image={setImage} isImageFn={setIsImage} type='image'/>
        :
        
        <div className='relative w-full h-full'>
          <img src={image} alt="songImage" className='w-full h-full object-cover rounded-md'/>
          <button className='absolute right-2 bottom-2 p-2 cursor-pointer bg-red-500 rounded-full z-10 hover:shadow-lg'
          onClick={()=> deleteImage('image',image)}>
            <MdDelete className='text-white'/>
          </button>
        </div> 
        )
        }
        
    </div>
  )
}

 const ImageUploader = ({progress}) => {
    return (
        <>
        <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-xl font-semibold text-textColor">
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>
      <div className="w-20 h-20 min-w-[40px] bg-red-600  animate-ping  rounded-full flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl "></div>
      </div>
    </div>
        </>
    )
}

const FileUpload = ({loaderfn,progressfn,image,isImageFn,type,setURL}) =>{

  const fileuploader = (e) => {
  loaderfn(false)
  const file= e.target.files[0]
  const storageRef = ref(storage, `${type ? 'Images' : 'Songs'}/${Date.now()}-${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on('state_changed',
  (snapshot) => {
  progressfn((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
  },
  (error) =>
  {
    //console.log(error);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //  console.log('File available at', downloadURL);
        image(downloadURL)
        progressfn(0);
        loaderfn(true)
        setURL(downloadURL)
      });
  } 
  )
}
    return (
        <>
        <label>
        <div className='h-full flex flex-col gap-2 justify-center items-center cursor-pointer'>
        <AiOutlineUpload/>
        <p>Click to Upload {type ? 'image' : 'song'}</p>
        </div>
        <input type="file" name='upload-file' accept={type ? 'image/*' : 'audio/*'} className='w-0 h-0' onChange={fileuploader}/>
        </label>
        </>
    )
}

export default SongsUpload