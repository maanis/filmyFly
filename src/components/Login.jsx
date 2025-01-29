import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import bg from '../../public/bg.jpg'
import Header from './Header'

const Login = () => {
    const [isSignIn, setisSignIn] = useState(true)
    console.log(isSignIn)
    return (
        <div style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='h-full flex justify-center items-center w-full relative'>
            <div className="gradient absolute w-full h-full bg-black/35 "></div>
            <Header />

            <div className='w-[25%]  text-white rounded-md  bg-black/85 relative p-6'>
                <h2 className='text-4xl font-semibold mb-5'>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                <form action="">
                    {!isSignIn && <input type="text" placeholder='Enter your full name' className='p-4 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-400 mt-5' />}
                    <input type="text" placeholder='Email or mobile number' className='p-4 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-400 mt-5' />
                    <input type="password" autoComplete='true' placeholder='Password' className='p-4 w-full text-lg outline-none border bg-transparent rounded-md border-zinc-400 mt-5' />
                    <button className='w-full cursor-pointer p-4 bg-red-600 rounded-md mt-8 text-2xl font-semibold'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
                    {isSignIn && <Link className='w-full text-center mt-4 inline-block' to={'/'}>Forgot password?</Link>}
                    <p className='text-center select-none mt-6 text-zinc-500'>{isSignIn ? 'New user?' : 'Already a user?'} <span onClick={() => setisSignIn(!isSignIn)} className='text-white cursor-pointer font-medium'>{isSignIn ? 'Sign up now.' : 'Sign in now.'}</span></p>
                </form>
            </div>

        </div>
    )
}

export default Login