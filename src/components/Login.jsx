import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import bg from '../../public/bg.jpg'
import Header from './Header'
import { credentialValidator } from '../utils/credentialValidator'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'

const Login = () => {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const [isSignIn, setisSignIn] = useState(true)
    const [error, seterror] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = credentialValidator(email.current.value, password.current.value)
        console.log('val', val)
        seterror(val)

        if (!isSignIn) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
                console.log("User signed up:", userCredential.user);
            } catch (error) {
                seterror(error.message)
            }

        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    seterror(errorCode + '-' + errorMessage)
                });
        }
        // console.log(auth)
    }
    return (
        <div style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-full flex justify-center items-center w-full relative'>
            <div className="gradient absolute w-full h-full bg-black/35 "></div>
            <Header />

            <div className='w-[22rem]  text-white rounded-md  bg-black/85 relative p-6'>
                <h2 className='text-4xl font-semibold mb-5'>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit} action="">
                    {!isSignIn && <input type="text" ref={name} placeholder='Enter your full name' className='p-4 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-400 mt-5' />}
                    <input type="text" ref={email} onChange={() => seterror(null)} placeholder='Email or mobile number' className='p-4 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-400 mt-5' />
                    <input type="password" ref={password} autoComplete='true' onChange={() => seterror(null)} placeholder='Password' className='p-4 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-400 mt-5' />
                    <p className='text-red-600 text-sm mt-6 leading-none whitespace-nowrap'>{error && error}</p>
                    <button className='w-full cursor-pointer p-4 bg-red-600 rounded-md mt-8 text-2xl font-semibold'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
                    {isSignIn && <Link className='w-full text-center mt-4 inline-block' to={'/'}>Forgot password?</Link>}
                    <p className='text-center select-none mt-6 text-zinc-500'>{isSignIn ? 'New user?' : 'Already a user?'} <span onClick={() => setisSignIn(!isSignIn)} className='text-white cursor-pointer font-medium'>{isSignIn ? 'Sign up now.' : 'Sign in now.'}</span></p>
                </form>
            </div>

        </div>
    )
}

export default Login