import { async } from '@firebase/util';
import axios from 'axios';

//const baseURL='https://music-player-ijjp.onrender.com'
const baseURL='http://localhost:4000'


export const userValidate = async (token) =>{
    try {
        const res =await axios.get(`${baseURL}/api/user/login`,
        {
            headers:{
                authorization:"Bearer "+ token
        }
        }
        )
        return res.data;
    } catch (error) {
        
    }
}

export const getAllSongs = async () =>{
    try {
        const res = await axios.get(`${baseURL}/api/song/getAllSong`);
       
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveSongs = async (data) => {
    try {
        const res=await axios.post(`${baseURL}/api/song/add`,{
        ...data
        })
        
        return (await res).data.saveData;
        
    } catch (error) {
        
    }
}

export const getAllArtists = async () =>{
    try {
        const res = await axios.get(`${baseURL}/api/artist/getAllArtist`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllAlbums = async () =>{
    try {
        const res = await axios.get(`${baseURL}/api/album/getAllAlbum`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const getAllUsers = async () =>{
    try {
        const res = await axios.get(`${baseURL}/api/user/getAll`);
        return res.data;
    } catch (error) {
        return null;
    }
}

export const userRole = async (_id,role) => {
    //console.log(_id,role);
    try {
        const res= await axios.put(`${baseURL}/api/user/updateRole/${_id}`,
        {
            role:role
        })
        return res.data;
    } catch (error) {
        return null
    }
} 

export const deleteUser = async (_id) => {
    try {
        const res=await axios.delete(`${baseURL}/api/user/delete/${_id}`)
        return res.data;
    } catch (error) {
        return null;
    }
}

export const saveArtist = async(data) => {
    try {
       const res=axios.post(`${baseURL}/api/artist/add`,{
        ...data
       }) 
       return (await res).data.saveData
    } catch (error) {
        return null;
    }
}

export const deleteArtist =async(_id) => {
    try {
        const res=await axios.delete(`${baseURL}/api/artist/delete/${_id}`)
        return res.data;
    } catch (error) {
        return null
    }
}

export const deleteSong =async(_id) => {
    try {
        const res=await axios.delete(`${baseURL}/api/song/delete/${_id}`)
        return res.data;
    } catch (error) {
        return null
    }
}