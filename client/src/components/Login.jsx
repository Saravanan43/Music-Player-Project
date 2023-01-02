import React, { useEffect } from 'react'
import {AiOutlineGoogle} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

import {app} from '../components/config/firebase.config'
import {getAuth,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { userValidate } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const Login = ({setauth}) => {

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
  });
const auth = getAuth(app); 

const navigate=useNavigate();



const[{user},dispatch] = useStateValue();

const loginWithGoogle = async() =>{

    await signInWithPopup(auth,provider)
    .then((result)=>
    {
        if(result)
        {
            setauth(true);
            window.localStorage.setItem('session','true');
            
            auth.onAuthStateChanged((userCred) => {
                if(userCred)
                {
                  // console.log(userCred);
                   userCred.getIdToken().then((token) =>{
                    userValidate(token).then((data) => {
                        dispatch({
                            type:actionType.SET_USER,
                            user:data,
                          })
                    
                    }
                    )
                   }
                   )
                   navigate('/dashboard/song');
                }
            }
            )
        }
        else
        {
           setauth(false);
           dispatch({
            type:actionType.SET_USER,
            user:null,
          })
           navigate('/login');
          // console.log('33');
        }
    }
    )
}

return (
    <div className='w-screen h-screen flex justify-center items-center bg-darkOverlay'>
         <div className='w-full absolute h-32 md:w-375 bg-lightOverlay md:rounded-xl shadow-lg flex justify-center items-center'>
             <div
                onClick={loginWithGoogle}
                 className='flex h-10 bg-white justify-center items-center gap-2 text-lg p-2 rounded-lg hover:cursor-pointer hover:shadow-lg'>
                <AiOutlineGoogle className='text-xl'/>
                Sign in with Google
             </div>

         </div>
    </div>
  )
}

export default Login;