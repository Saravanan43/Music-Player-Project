import React from 'react'

function Alert({type}) {
  return (
    <>
    {
        type === 'null' && ( 
        <div className='fixed top-2 right-4 z-10'>
            Hiiii
        </div>
        )
    }  
    </>  
  )
    }
   


export default Alert