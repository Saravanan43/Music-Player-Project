import React, { useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import moment from 'moment';
import { deleteUser, getAllUsers, userRole } from '../../api';
import { actionType } from '../../context/reducer';
import {BsTrashFill} from 'react-icons/bs';
import { useEffect } from 'react';

const DashBoardCard = (props) => {
  const data=props.data
  const user=props.user

  const [open,setOpen]=useState(false)
  const [{allUsers},dispatch]=useStateValue();

 
  const email_verified=data.email_verified;
  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY');

  useEffect(()=>{
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
     
  
  const userRoleTrigger = (_id,role) => {
   
      userRole(_id,role).then((data) => {
        if(data)
        {
        getAllUsers().then((result) => 
        {
             dispatch({
        type:actionType.SET_ALL_USER,
        allUsers:result.getAllUsers
        })
        })
        }
        
       setOpen(false)
    })

   }
   
   const userDelete = (_id) => {
   
     deleteUser(_id).then((res) => {
      if(res)
      {
        alert('User got deleted')
        getAllUsers().then((data) => {
          dispatch({
            type:actionType.SET_ALL_USER,
            allUsers:data.getAllUsers
            })
        })
      }
    })
  } 
 
  return (
    <div className='w-full relative flex text-sm text-texColor hover:bg-white hover:shadow-lg hover:cursor-pointer py-2 group' onMouseLeave={()=> {if(open) setOpen(false)}}>
      
      {
        user?._id!== data?._id && (
          <button onClick={()=>userDelete(data?._id)}  className='hidden group-hover:block absolute top-8 left-4 text-semibold text-red-400 p-1 hover:bg-slate-300 rounded-full hover:text-red-500'><BsTrashFill/></button>
        )
      }
      
      <div className='  w-225 flex items-center justify-center'>
        <img src={data.imageURL} alt="dp" className='w-16 h-full object-cover flex rounded-lg' referrerPolicy='no-referrer' />
      </div>
      <p className='w-225 flex items-center justify-center'>{data?.name}</p>
      <p className='w-225 flex items-center justify-center'>{data?.email}</p>
      <p className='w-225 flex items-center justify-center'>{email_verified ? "True" : "False" }</p>
      <p className='w-225 flex items-center justify-center'>{createdAt}</p>
      <p className='relative w-225 flex items-center justify-center gap-2'>{data?.role}
      { data?._id !== user?._id &&
      (
        <button className='p-1 bg-purple-400 hover:bg-purple-500 text-sm shadow-md rounded-md ' onClick={()=> setOpen(!open)}>
          {
            data?.role ==='member' ? 'admin' : 'member'
          }
        </button>
      )
      }
      </p>
      {
        open && (
          <div className='absolute p-3 rounded-md w-225 top-16 z-10 bg-white shadow-lg right-10 flex flex-col gap-1 '>
        <p>Do you want to change the role to <span>{data.role==='member'? 'admin' : 'member'}</span> ?</p>
        <div className='flex items-center justify-center gap-3'>
          <button className='px-2  text-sm bg-green-300 rounded-lg hover:bg-green-400' onClick={()=>userRoleTrigger(data?._id,data.role === 'admin' ? 'member' : 'admin')}>Yes</button>
        <button className='px-2  text-sm bg-red-300 rounded-lg hover:bg-red-400' onClick={()=> setOpen(!open)}>No</button>
        </div>
        </div>
        )
      }
      
    </div>
  )
}

const DashBoardUsers = () => {
  
  const [{allUsers,user},dispatch]=useStateValue();
  useEffect(()=>{
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
    <div className='relative my-4  border border-gray-400 overflow-y-scroll rounded-lg min-h-[400px] m-5 pl-24  py-2' >
      <p className='mr-auto'>Count : <span className='text-lg font-medium'>{allUsers?.length}</span></p>
      <div className='flex mt-4 '>
      <p className='w-225 flex items-center justify-center'>Image</p>
      <p className='w-225 flex items-center justify-center'>Name</p>
      <p className='w-225 flex items-center justify-center'>Email</p>
      <p className='w-225 flex items-center justify-center'>Verified</p>
      <p className='w-225 flex items-center justify-center'>Created</p>
      <p className='w-225 flex items-center justify-center'>Role</p>
      </div>

     
         <div className='flex flex-col my-10 gap-5'>
        {
          allUsers && (
            allUsers.map((data) => (
           <DashBoardCard data={data} user={user}/>
            )
           )
            
          )
        }
      </div> 
      
    </div>
  )
}

export default DashBoardUsers